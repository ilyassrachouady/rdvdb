import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { api } from '@/lib/api';
import { demoDentist } from '@/lib/mock-data';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarScheduler } from '@/components/ui/calendar-scheduler';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Calendar as CalendarIcon,
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

export interface BookingData {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes: string;
  saveInfo: boolean;
  appointmentId?: string | null;
}

interface EnhancedBookingFlowProps {
  onSuccess?: (bookingData: BookingData) => void;
  onCancel?: () => void;
  className?: string;
  compact?: boolean;
}

export default function EnhancedBookingFlow({
  onSuccess,
  onCancel,
  className,
  compact = false
}: EnhancedBookingFlowProps) {
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

  const dentist = demoDentist;

  // Auto-advance logic
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

  // Load saved info
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

  // Load time slots when service and date selected
  useEffect(() => {
    if (booking.service && selectedDate) {
      loadTimeSlots();
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, booking.service]);

  const loadTimeSlots = async () => {
    if (!selectedDate || !dentist || !booking.service) {
      setAvailableSlots([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const slots = await api.getAvailableSlots(dentist.id, selectedDate);
      
      if (!slots || slots.length === 0) {
        setAvailableSlots([]);
        setIsLoading(false);
        return;
      }
      
      const day = selectedDate.getDay();
      const filteredSlots = slots.filter(time => {
        if (day === 0) return false; // Sunday disabled
        if (day === 6) { // Saturday morning only
          const hour = parseInt(time.split(':')[0]);
          return hour < 12;
        }
        return true;
      });

      const timeSlots: TimeSlot[] = filteredSlots.map(time => {
        const capacity = Math.floor(Math.random() * 4) + 3;
        const remaining = Math.floor(Math.random() * capacity) + 1;
        return {
          time,
          capacity,
          remaining,
          isAvailable: remaining > 0,
        };
      });
      
      setAvailableSlots(timeSlots);
    } catch (error) {
      console.error('Error loading time slots:', error);
      setAvailableSlots([]);
      toast.error('Erreur lors du chargement des créneaux');
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setBooking(prev => ({ ...prev, service }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setBooking(prev => ({ ...prev, date, timeSlot: null }));
    }
  };

  const handleTimeSlotSelect = async (slot: TimeSlot) => {
    if (!slot.isAvailable) return;
    setBooking(prev => ({ ...prev, timeSlot: slot }));
  };

  const handleSubmit = async () => {
    if (!booking.service || !booking.date || !booking.timeSlot || !booking.patientName || !booking.patientPhone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    try {
      const appointment = await api.bookAppointment({
        dentistId: dentist.id,
        serviceId: booking.service.id,
        date: booking.date.toISOString(),
        time: booking.timeSlot.time,
        patientName: booking.patientName,
        patientPhone: booking.patientPhone,
        patientEmail: booking.patientEmail || undefined,
        notes: booking.notes || undefined,
      });

      const finalBooking = { ...booking, appointmentId: appointment.id };
      setBooking(finalBooking);

      if (booking.saveInfo) {
        localStorage.setItem('patientInfo', JSON.stringify({
          name: booking.patientName,
          phone: booking.patientPhone,
          email: booking.patientEmail,
        }));
      }

      setShowSuccess(true);
      toast.success('Rendez-vous confirmé! Un message a été envoyé à ' + booking.patientPhone);
      
      if (onSuccess) {
        onSuccess(finalBooking);
      }
    } catch (error) {
      toast.error('Erreur lors de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('212')) {
      return `+212 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    }
    return cleaned;
  };

  const isStepComplete = (step: string) => {
    switch (step) {
      case 'service': return !!booking.service;
      case 'datetime': return !!(booking.service && booking.date && booking.timeSlot);
      case 'details': return !!(booking.patientName && booking.patientPhone);
      case 'confirm': return showSuccess;
      default: return false;
    }
  };

  const canProceedToConfirm = booking.service && booking.date && booking.timeSlot && booking.patientName && booking.patientPhone;

  if (showSuccess) {
    return (
      <div className={cn("p-8 space-y-6", className)}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rendez-vous confirmé!</h2>
          <p className="text-gray-600">Numéro de confirmation: <span className="font-mono font-bold">{booking.appointmentId}</span></p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium text-blue-900 mb-1">{booking.service?.name}</div>
                <div className="text-blue-700">
                  {booking.date && format(booking.date, 'EEEE d MMMM yyyy', { locale: fr })}
                </div>
                <div className="text-blue-700 font-semibold">{booking.timeSlot?.time}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-900">{booking.service?.price} MAD</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={() => {
              setShowSuccess(false);
              setCurrentSection('service');
              setBooking({
                service: null,
                date: null,
                timeSlot: null,
                patientName: booking.patientName,
                patientPhone: booking.patientPhone,
                patientEmail: booking.patientEmail,
                notes: '',
                saveInfo: booking.saveInfo,
              });
            }}
            variant="outline"
            className="flex-1 rounded-xl"
          >
            Nouveau rendez-vous
          </Button>
          {onCancel && (
            <Button onClick={onCancel} className="flex-1 rounded-xl">
              Fermer
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[
          { id: 'service', label: 'Service', icon: Stethoscope },
          { id: 'datetime', label: 'Date & Heure', icon: CalendarIcon },
          { id: 'details', label: 'Détails', icon: User },
          { id: 'confirm', label: 'Confirmation', icon: CheckCircle2 },
        ].map((step, index) => {
          const isActive = currentSection === step.id;
          const isCompleted = isStepComplete(step.id);
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  if (isCompleted || index === 0) {
                    setCurrentSection(step.id as any);
                  }
                }}
                className="flex flex-col items-center group"
                disabled={!isCompleted && !isActive && index !== 0}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all mb-2",
                  isCompleted ? "bg-green-500 border-green-500 text-white" :
                  isActive ? "bg-blue-600 border-blue-600 text-white" :
                  "bg-gray-100 border-gray-300 text-gray-400"
                )}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-blue-600" : 
                  isCompleted ? "text-green-600" : "text-gray-400"
                )}>{step.label}</span>
              </button>
              {index < 3 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors",
                  isStepComplete(['service', 'datetime', 'details'][index]) ? "bg-green-500" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className={cn(
        "grid gap-6",
        compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
      )}>
        {/* Service Selection */}
        <Card className={cn(
          "transition-all duration-300",
          currentSection === 'service' ? "ring-2 ring-blue-500 shadow-lg" : 
          booking.service ? "bg-green-50 border-green-200" : "opacity-50"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Service</h3>
              {booking.service && <Check className="w-5 h-5 text-green-600" />}
            </div>
            
            {currentSection === 'service' || !booking.service ? (
              <div className="space-y-3">
                {dentist.services.map((service: Service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
                      booking.service?.id === service.id
                        ? "border-blue-500 bg-blue-50 scale-105"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{service.name}</div>
                      {service.id === 's1' && (
                        <Badge className="bg-orange-100 text-orange-700 text-xs">Populaire</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{service.description}</div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">{service.price} MAD</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-white rounded-xl border border-green-200">
                <div className="font-medium text-green-900">{booking.service.name}</div>
                <div className="text-sm text-green-700">{booking.service.price} MAD</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date & Time Selection */}
        <Card className={cn(
          "transition-all duration-300",
          currentSection === 'datetime' ? "ring-2 ring-blue-500 shadow-lg" : 
          booking.timeSlot ? "bg-green-50 border-green-200" : "opacity-50"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Date & Heure</h3>
              {booking.timeSlot && <Check className="w-5 h-5 text-green-600" />}
            </div>

            {(currentSection === 'datetime' || !booking.timeSlot) && booking.service ? (
              <div className="space-y-4">
                <CalendarScheduler
                  timeSlots={availableSlots.map(s => s.time)}
                  disabledDates={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                  onDateChange={handleDateSelect}
                  onConfirm={({ date, time }) => {
                    if (date && time) {
                      handleDateSelect(date);
                      const slot = availableSlots.find(s => s.time === time);
                      if (slot) handleTimeSlotSelect(slot);
                    }
                  }}
                />
              </div>
            ) : booking.timeSlot ? (
              <div className="p-4 bg-white rounded-xl border border-green-200">
                <div className="font-medium text-green-900">
                  {booking.date && format(booking.date, 'EEEE d MMMM', { locale: fr })}
                </div>
                <div className="text-sm text-green-700">{booking.timeSlot.time}</div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Sélectionnez d'abord un service</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card className={cn(
          "transition-all duration-300",
          currentSection === 'details' ? "ring-2 ring-blue-500 shadow-lg" : 
          booking.patientName && booking.patientPhone ? "bg-green-50 border-green-200" : "opacity-50"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Vos informations</h3>
              {booking.patientName && booking.patientPhone && <Check className="w-5 h-5 text-green-600" />}
            </div>

            {(currentSection === 'details' || !booking.patientName || !booking.patientPhone) && booking.timeSlot ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Nom complet *</Label>
                  <Input
                    id="name"
                    value={booking.patientName}
                    onChange={(e) => setBooking(prev => ({ ...prev, patientName: e.target.value }))}
                    className="mt-1 rounded-lg"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={booking.patientPhone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setBooking(prev => ({ ...prev, patientPhone: formatted }));
                    }}
                    className="mt-1 rounded-lg"
                    placeholder="+212 6 12 34 56 78"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email (optionnel)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={booking.patientEmail}
                    onChange={(e) => setBooking(prev => ({ ...prev, patientEmail: e.target.value }))}
                    className="mt-1 rounded-lg"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={booking.notes}
                    onChange={(e) => setBooking(prev => ({ ...prev, notes: e.target.value }))}
                    className="mt-1 rounded-lg"
                    placeholder="Informations supplémentaires..."
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveInfo"
                    checked={booking.saveInfo}
                    onCheckedChange={(checked) =>
                      setBooking(prev => ({ ...prev, saveInfo: checked as boolean }))
                    }
                  />
                  <Label htmlFor="saveInfo" className="text-sm text-gray-600">
                    Enregistrer mes informations
                  </Label>
                </div>
              </div>
            ) : booking.patientName && booking.patientPhone ? (
              <div className="p-4 bg-white rounded-xl border border-green-200 space-y-2">
                <div className="font-medium text-green-900">{booking.patientName}</div>
                <div className="text-sm text-green-700 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {booking.patientPhone}
                </div>
                {booking.patientEmail && (
                  <div className="text-sm text-green-700 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {booking.patientEmail}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Choisissez d'abord une date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary & Actions */}
      {canProceedToConfirm && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Résumé de votre réservation</h3>
              <div className="text-2xl font-bold text-blue-600">{booking.service?.price} MAD</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div>
                <div className="font-medium text-gray-900">{booking.service?.name}</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {booking.date && format(booking.date, 'EEEE d MMMM', { locale: fr })}
                </div>
                <div className="text-gray-600">{booking.timeSlot?.time}</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{booking.patientName}</div>
                <div className="text-gray-600">{booking.patientPhone}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
              >
                {isLoading ? 'Confirmation...' : 'Confirmer la réservation'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {onCancel && (
                <Button onClick={onCancel} variant="outline" className="rounded-xl h-12">
                  Annuler
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}