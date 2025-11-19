import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { api } from '@/lib/api';
import { demoDentist } from '@/lib/mock-data';
import { Service } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ModernButton } from '@/components/ui/modern-button';
import { toast } from 'sonner';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  Stethoscope,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeSlot {
  time: string;
  capacity: number;
  remaining: number;
  isAvailable: boolean;
}

interface BookingData {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes: string;
}

interface AppleBookingFlowProps {
  onComplete?: (booking: BookingData) => void;
  isEmbedded?: boolean; // true when used in dashboard
}

export const AppleBookingFlow: React.FC<AppleBookingFlowProps> = ({ 
  onComplete, 
  isEmbedded = false 
}) => {
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    timeSlot: null,
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    notes: '',
  });

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const dentist = demoDentist;

  // Load saved patient info
  useEffect(() => {
    const saved = localStorage.getItem('patientInfo');
    if (saved) {
      const info = JSON.parse(saved);
      setBooking(prev => ({
        ...prev,
        patientName: info.name || '',
        patientPhone: info.phone || '',
        patientEmail: info.email || '',
      }));
    }
  }, []);

  // Load time slots when date changes
  useEffect(() => {
    if (booking.service && booking.date) {
      loadTimeSlots();
    }
  }, [booking.service, booking.date]);

  const loadTimeSlots = async () => {
    if (!booking.service || !booking.date) return;
    
    setIsLoading(true);
    try {
      const response = await api.getAvailableSlots(
        dentist.id,
        booking.service.id,
        format(booking.date, 'yyyy-MM-dd')
      );
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error loading slots:', error);
      // Demo fallback slots
      const demoSlots = [
        { time: '09:00', capacity: 1, remaining: 1, isAvailable: true },
        { time: '10:30', capacity: 1, remaining: 1, isAvailable: true },
        { time: '14:00', capacity: 1, remaining: 0, isAvailable: false },
        { time: '15:30', capacity: 1, remaining: 1, isAvailable: true },
        { time: '17:00', capacity: 1, remaining: 1, isAvailable: true },
      ];
      setAvailableSlots(demoSlots);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setBooking(prev => ({ ...prev, service }));
  };

  const handleDateSelect = (date: Date) => {
    setBooking(prev => ({ ...prev, date, timeSlot: null }));
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setBooking(prev => ({ ...prev, timeSlot }));
  };

  const handleSubmit = async () => {
    if (!booking.service || !booking.date || !booking.timeSlot || !booking.patientName || !booking.patientPhone) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    setIsLoading(true);
    try {
      const appointmentData = {
        dentistId: dentist.id,
        serviceId: booking.service.id,
        date: format(booking.date, 'yyyy-MM-dd'),
        time: booking.timeSlot.time,
        patientName: booking.patientName,
        patientPhone: booking.patientPhone,
        patientEmail: booking.patientEmail,
        notes: booking.notes,
      };

      // Save patient info
      localStorage.setItem('patientInfo', JSON.stringify({
        name: booking.patientName,
        phone: booking.patientPhone,
        email: booking.patientEmail,
      }));

      await api.bookAppointment(appointmentData);
      toast.success('Rendez-vous confirmé !');
      onComplete?.(booking);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Erreur lors de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfWeek(currentWeek, { weekStartsOn: 1 }), i)
  );

  // Progress calculation
  const progress = (
    (booking.service ? 25 : 0) +
    (booking.date ? 25 : 0) +
    (booking.timeSlot ? 25 : 0) +
    (booking.patientName && booking.patientPhone ? 25 : 0)
  );

  const isComplete = progress === 100;

  return (
    <div className={cn(
      'w-full max-w-6xl mx-auto',
      isEmbedded ? 'p-0' : 'p-6'
    )}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-slate-900">Réserver un rendez-vous</h2>
          <span className="text-sm text-slate-500">{progress}% complété</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Booking Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[500px]">
        
        {/* Step 1: Service Selection */}
        <div className={cn(
          'bg-white rounded-xl border-2 p-4 transition-all duration-300',
          booking.service ? 'border-green-200 bg-green-50' : 'border-slate-200',
          !booking.service && 'ring-2 ring-blue-500 ring-opacity-50'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              booking.service ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            )}>
              {booking.service ? <Check className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
            </div>
            <h3 className="font-semibold text-slate-900">Service</h3>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-96">
            {dentist.services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md',
                  booking.service?.id === service.id
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <div className="font-medium text-sm text-slate-900">{service.name}</div>
                <div className="font-bold text-teal-600">{service.price} MAD</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Date Selection */}
        <div className={cn(
          'bg-white rounded-xl border-2 p-4 transition-all duration-300',
          booking.date ? 'border-green-200 bg-green-50' : 'border-slate-200',
          booking.service && !booking.date && 'ring-2 ring-blue-500 ring-opacity-50',
          !booking.service && 'opacity-50 pointer-events-none'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              booking.date ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            )}>
              {booking.date ? <Check className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
            </div>
            <h3 className="font-semibold text-slate-900">Date</h3>
          </div>

          <div className="space-y-4">
            {/* Week Navigation */}
            <div className="flex justify-between items-center">
              <ModernButton 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              >
                ←
              </ModernButton>
              <span className="text-sm font-medium">
                {format(currentWeek, 'MMMM yyyy', { locale: fr })}
              </span>
              <ModernButton 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              >
                →
              </ModernButton>
            </div>

            {/* Week Calendar */}
            <div className="grid grid-cols-1 gap-1">
              {weekDates.map((date, index) => {
                const isSelected = booking.date && isSameDay(date, booking.date);
                const isPast = date < new Date();
                
                return (
                  <div
                    key={index}
                    onClick={() => !isPast && handleDateSelect(date)}
                    className={cn(
                      'p-2 rounded-lg text-center cursor-pointer transition-all duration-200 text-sm',
                      isPast 
                        ? 'text-slate-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-slate-100'
                    )}
                  >
                    <div className="font-medium">
                      {format(date, 'EEE', { locale: fr })}
                    </div>
                    <div className="text-xs">
                      {format(date, 'd MMM', { locale: fr })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Time Selection */}
        <div className={cn(
          'bg-white rounded-xl border-2 p-4 transition-all duration-300',
          booking.timeSlot ? 'border-green-200 bg-green-50' : 'border-slate-200',
          booking.date && !booking.timeSlot && 'ring-2 ring-blue-500 ring-opacity-50',
          !booking.date && 'opacity-50 pointer-events-none'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              booking.timeSlot ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            )}>
              {booking.timeSlot ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>
            <h3 className="font-semibold text-slate-900">Heure</h3>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-96">
            {isLoading ? (
              <div className="text-center py-4 text-slate-500">Chargement...</div>
            ) : (
              availableSlots.map((slot) => (
                <div
                  key={slot.time}
                  onClick={() => slot.isAvailable && handleTimeSelect(slot)}
                  className={cn(
                    'p-3 rounded-lg border text-center cursor-pointer transition-all duration-200',
                    !slot.isAvailable 
                      ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : booking.timeSlot?.time === slot.time
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  )}
                >
                  <div className="font-medium text-sm">{slot.time}</div>
                  {!slot.isAvailable && (
                    <div className="text-xs text-slate-400">Complet</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 4: Patient Information */}
        <div className={cn(
          'bg-white rounded-xl border-2 p-4 transition-all duration-300',
          isComplete ? 'border-green-200 bg-green-50' : 'border-slate-200',
          booking.timeSlot && !isComplete && 'ring-2 ring-blue-500 ring-opacity-50',
          !booking.timeSlot && 'opacity-50 pointer-events-none'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              isComplete ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            )}>
              {isComplete ? <Check className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <h3 className="font-semibold text-slate-900">Informations</h3>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-80">
            <div>
              <Label htmlFor="name" className="text-xs font-medium text-slate-700">
                Nom complet *
              </Label>
              <Input
                id="name"
                value={booking.patientName}
                onChange={(e) => setBooking(prev => ({ ...prev, patientName: e.target.value }))}
                placeholder="Votre nom"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-xs font-medium text-slate-700">
                Téléphone *
              </Label>
              <Input
                id="phone"
                value={booking.patientPhone}
                onChange={(e) => setBooking(prev => ({ ...prev, patientPhone: e.target.value }))}
                placeholder="06 12 34 56 78"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-medium text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={booking.patientEmail}
                onChange={(e) => setBooking(prev => ({ ...prev, patientEmail: e.target.value }))}
                placeholder="votre@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-xs font-medium text-slate-700">
                Notes (optionnel)
              </Label>
              <Textarea
                id="notes"
                value={booking.notes}
                onChange={(e) => setBooking(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Informations supplémentaires..."
                rows={3}
                className="mt-1 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary & Confirmation */}
      {isComplete && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Récapitulatif</h3>
              <div className="space-y-1 text-sm text-slate-700">
                <div><strong>Service:</strong> {booking.service?.name}</div>
                <div><strong>Date:</strong> {booking.date && format(booking.date, 'EEEE d MMMM yyyy', { locale: fr })}</div>
                <div><strong>Heure:</strong> {booking.timeSlot?.time}</div>
                <div><strong>Patient:</strong> {booking.patientName}</div>
                <div><strong>Téléphone:</strong> {booking.patientPhone}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{booking.service?.price} MAD</div>
            </div>
          </div>
          
          <ModernButton 
            onClick={handleSubmit}
            loading={isLoading}
            size="lg"
            className="w-full"
            icon={<CheckCircle2 className="w-5 h-5" />}
          >
            Confirmer le rendez-vous
          </ModernButton>
        </div>
      )}
    </div>
  );
};