import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { api } from '@/lib/api';
import { demoDentist } from '@/lib/mock-data';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarScheduler } from '@/components/ui/calendar-scheduler';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, User, CheckCircle2, Stethoscope, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useMemoizedCallback } from '@/hooks/useMemoizedCallback';

interface TimeSlot {
  time: string;
  capacity: number;
  remaining: number;
  isAvailable: boolean;
}

export interface BookingData {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes: string;
  saveInfo: boolean;
}

interface OptimizedBookingFlowProps {
  onSuccess?: (bookingData: BookingData) => void;
  onCancel?: () => void;
  className?: string;
  compact?: boolean;
}

// Memoized Service Card Component
const ServiceCard = memo(({ 
  service, 
  isSelected, 
  onSelect 
}: { 
  service: Service; 
  isSelected: boolean; 
  onSelect: (service: Service) => void;
}) => {
  const handleClick = useCallback(() => {
    onSelect(service);
  }, [service, onSelect]);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:border-blue-200"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{service.name}</h3>
            {service.description && (
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            )}
            <p className="text-lg font-semibold text-blue-600 mt-2">
              {service.price} MAD
            </p>
          </div>
          {isSelected && (
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Memoized Time Slot Component
const TimeSlotButton = memo(({ 
  slot, 
  isSelected, 
  onSelect 
}: { 
  slot: TimeSlot; 
  isSelected: boolean; 
  onSelect: (slot: TimeSlot) => void;
}) => {
  const handleClick = useCallback(() => {
    if (slot.isAvailable) {
      onSelect(slot);
    }
  }, [slot, onSelect]);

  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      disabled={!slot.isAvailable}
      className={cn(
        "h-10 transition-all duration-200",
        isSelected && "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {slot.time}
    </Button>
  );
});

TimeSlotButton.displayName = 'TimeSlotButton';

export default function OptimizedBookingFlow({
  onSuccess,
  onCancel,
  className,
  compact = false
}: OptimizedBookingFlowProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentSection, setCurrentSection] = useState<'service' | 'datetime' | 'details' | 'confirm'>('service');
  
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    timeSlot: null,
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    notes: '',
    saveInfo: false,
  });

  // Debounce patient info changes to reduce API calls
  const debouncedPatientName = useDebounce(booking.patientName, 300);
  const debouncedPatientPhone = useDebounce(booking.patientPhone, 300);

  const dentist = useMemo(() => demoDentist, []);

  // Memoized service selection handler
  const handleServiceSelect = useMemoizedCallback((service: Service) => {
    setBooking(prev => ({ ...prev, service }));
  }, []);

  // Memoized time slot selection handler
  const handleTimeSlotSelect = useMemoizedCallback((slot: TimeSlot) => {
    setBooking(prev => ({ ...prev, timeSlot: slot }));
  }, []);

  // Memoized date selection handler
  const handleDateSelect = useMemoizedCallback((date: Date | undefined) => {
    setSelectedDate(date);
    setBooking(prev => ({ ...prev, date: date || null, timeSlot: null }));
  }, []);

  // Memoized available slots computation
  const timeSlotComponents = useMemo(() => {
    if (!availableSlots.length) return null;

    return availableSlots.map((slot) => (
      <TimeSlotButton
        key={slot.time}
        slot={slot}
        isSelected={booking.timeSlot?.time === slot.time}
        onSelect={handleTimeSlotSelect}
      />
    ));
  }, [availableSlots, booking.timeSlot?.time, handleTimeSlotSelect]);

  // Memoized service cards
  const serviceCards = useMemo(() => {
    return dentist.services.map((service) => (
      <ServiceCard
        key={service.id}
        service={service}
        isSelected={booking.service?.id === service.id}
        onSelect={handleServiceSelect}
      />
    ));
  }, [dentist.services, booking.service?.id, handleServiceSelect]);

  // Auto-advance logic with useCallback optimization
  useEffect(() => {
    if (booking.service && currentSection === 'service') {
      setCurrentSection('datetime');
    }
  }, [booking.service, currentSection]);

  useEffect(() => {
    if (booking.timeSlot && currentSection === 'datetime') {
      setCurrentSection('details');
    }
  }, [booking.timeSlot, currentSection]);

  // Load available slots when date changes
  useEffect(() => {
    if (selectedDate && booking.service) {
      setIsLoading(true);
      api.getAvailableSlots(dentist.id, selectedDate)
        .then((slots) => {
          const timeSlots: TimeSlot[] = slots.map(time => ({
            time,
            capacity: 1,
            remaining: 1,
            isAvailable: true,
          }));
          setAvailableSlots(timeSlots);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [selectedDate, booking.service, dentist.id]);

  // Optimized form submission
  const handleSubmit = useCallback(async () => {
    if (!booking.service || !booking.date || !booking.timeSlot) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    if (!booking.patientName.trim() || !booking.patientPhone.trim()) {
      toast.error('Nom et téléphone requis');
      return;
    }

    setIsLoading(true);

    try {
      const bookingData = {
        dentistId: dentist.id,
        serviceId: booking.service.id,
        date: format(booking.date, 'yyyy-MM-dd'),
        time: booking.timeSlot.time,
        patientName: booking.patientName.trim(),
        patientPhone: booking.patientPhone.trim(),
        patientEmail: booking.patientEmail.trim(),
        notes: booking.notes.trim(),
      };

      await api.bookAppointment(bookingData);
      
      // Save patient info if requested
      if (booking.saveInfo) {
        localStorage.setItem('patientInfo', JSON.stringify({
          name: booking.patientName,
          phone: booking.patientPhone,
          email: booking.patientEmail,
        }));
      }

      setShowSuccess(true);
      toast.success('Rendez-vous confirmé!');
      
      if (onSuccess) {
        onSuccess(booking);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Erreur lors de la réservation');
    } finally {
      setIsLoading(false);
    }
  }, [booking, dentist.id, onSuccess]);

  // Success state
  if (showSuccess) {
    return (
      <div className={cn("text-center py-8", className)}>
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rendez-vous confirmé!</h2>
        <p className="text-gray-600 mb-6">
          Votre rendez-vous a été enregistré. Vous recevrez une confirmation par WhatsApp.
        </p>
        <Button onClick={onCancel} variant="outline">
          Fermer
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {['service', 'datetime', 'details'].map((step, index) => {
          const isComplete = 
            (step === 'service' && booking.service) ||
            (step === 'datetime' && booking.timeSlot) ||
            (step === 'details' && booking.patientName && booking.patientPhone);
          const isCurrent = currentSection === step;
          
          return (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  isComplete ? "bg-green-600 text-white" :
                  isCurrent ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                )}
              >
                {isComplete ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              {index < 2 && (
                <div className={cn(
                  "w-12 h-0.5 mx-2",
                  isComplete ? "bg-green-600" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Service Selection */}
      {currentSection === 'service' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
            Choisissez un service
          </h3>
          <div className="grid gap-3">
            {serviceCards}
          </div>
        </div>
      )}

      {/* Date & Time Selection */}
      {currentSection === 'datetime' && booking.service && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
            Choisissez une date et heure
          </h3>
          
          <CalendarScheduler
            timeSlots={availableSlots.map(s => s.time)}
            disabledDates={(date) => {
              const day = format(date, 'EEEE').toLowerCase();
              return !dentist.workingHours[day]?.enabled;
            }}
            onDateChange={handleDateSelect}
            onConfirm={({ date, time }) => {
              if (date) handleDateSelect(date);
              const slot = availableSlots.find(s => s.time === time);
              if (slot) handleTimeSlotSelect(slot);
            }}
          />

          {selectedDate && availableSlots.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Créneaux disponibles</h4>
              <div className="grid grid-cols-4 gap-2">
                {timeSlotComponents}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Patient Details */}
      {currentSection === 'details' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Vos informations
          </h3>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="patientName">Nom complet *</Label>
              <Input
                id="patientName"
                value={booking.patientName}
                onChange={(e) => setBooking(prev => ({ ...prev, patientName: e.target.value }))}
                placeholder="Votre nom complet"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="patientPhone">Téléphone *</Label>
              <Input
                id="patientPhone"
                value={booking.patientPhone}
                onChange={(e) => setBooking(prev => ({ ...prev, patientPhone: e.target.value }))}
                placeholder="+212 6XX XXX XXX"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="patientEmail">Email (optionnel)</Label>
              <Input
                id="patientEmail"
                type="email"
                value={booking.patientEmail}
                onChange={(e) => setBooking(prev => ({ ...prev, patientEmail: e.target.value }))}
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button onClick={onCancel} variant="outline">
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!booking.patientName.trim() || !booking.patientPhone.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Confirmation...' : 'Confirmer le rendez-vous'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}