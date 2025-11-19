import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Smile,
  Heart,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Award,
  Users,
  Zap,
  Shield,
  Play,
  ChevronRight,
  Quote,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  GraduationCap,
  Building,
  Scissors,
  Target,
  Eye,
  Camera,
  Microscope
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

// Premium dental services data
const services = [
  {
    id: '1',
    name: 'Dentisterie Esthétique',
    description: 'Facettes, couronnes céramiques, et blanchiment professionnel pour un sourire éclatant.',
    icon: Smile,
    features: ['Facettes porcelaine', 'Blanchiment laser', 'Couronnes esthétiques'],
    price: 'À partir de 2,500 DH',
    image: 'aesthetic-dentistry.jpg'
  },
  {
    id: '2',
    name: 'Implantologie Avancée',
    description: 'Remplacement permanent des dents manquantes avec la technologie 3D.',
    icon: Target,
    features: ['Implants titanium', 'Guidage 3D', 'Prothèses fixes'],
    price: 'À partir de 8,000 DH',
    image: 'implantology.jpg'
  },
  {
    id: '3',
    name: 'Orthodontie Moderne',
    description: 'Alignement dentaire avec appareils traditionnels ou invisibles.',
    icon: ShieldCheck,
    features: ['Brackets céramiques', 'Invisalign', 'Orthodontie linguale'],
    price: 'À partir de 12,000 DH',
    image: 'orthodontics.jpg'
  },
  {
    id: '4',
    name: 'Chirurgie Orale',
    description: 'Extractions complexes, greffes osseuses, et chirurgie parodontale.',
    icon: Scissors,
    features: ['Extractions wisdom', 'Greffes osseuses', 'Chirurgie guidée'],
    price: 'Sur consultation',
    image: 'oral-surgery.jpg'
  },
  {
    id: '5',
    name: 'Parodontologie',
    description: 'Traitement spécialisé des gencives et de l\'os alvéolaire.',
    icon: Heart,
    features: ['Detartrage profond', 'Chirurgie parodontale', 'Maintenance'],
    price: 'À partir de 800 DH',
    image: 'periodontics.jpg'
  },
  {
    id: '6',
    name: 'Endodontie',
    description: 'Traitement des canaux radiculaires avec technologie rotative.',
    icon: Microscope,
    features: ['Microscope dentaire', 'Obturation 3D', 'Retraitement'],
    price: 'À partir de 1,200 DH',
    image: 'endodontics.jpg'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah El Mansouri',
    role: 'Architecte',
    content: 'Une expérience exceptionnelle du début à la fin. Le Dr. El Amrani a transformé mon sourire avec une attention au détail remarquable. Le cabinet est moderne et l\'équipe est très professionnelle.',
    rating: 5,
    image: 'patient1.jpg'
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    role: 'Directeur Commercial',
    content: 'J\'avais une phobie du dentiste, mais l\'approche douce et professionnelle du Dr. El Amrani m\'a complètement rassuré. Les implants qu\'il m\'a posés sont parfaits.',
    rating: 5,
    image: 'patient2.jpg'
  },
  {
    id: 3,
    name: 'Latifa Zerouali',
    role: 'Professeure',
    content: 'Un véritable artiste ! Mes facettes sont si naturelles que personne ne remarque qu\'elles ne sont pas mes vraies dents. Un travail de très haute qualité.',
    rating: 5,
    image: 'patient3.jpg'
  }
];

const achievements = [
  {
    icon: GraduationCap,
    title: 'Doctorat en Chirurgie Dentaire',
    subtitle: 'Université Mohammed V - Rabat',
    year: '2008'
  },
  {
    icon: Award,
    title: 'Spécialisation en Implantologie',
    subtitle: 'Institut Straumann - Suisse',
    year: '2012'
  },
  {
    icon: Building,
    title: 'Fellowship en Esthétique',
    subtitle: 'Beverly Hills Institute',
    year: '2015'
  },
  {
    icon: Users,
    title: '2000+ Patients Satisfaits',
    subtitle: 'Plus de 15 ans d\'expérience',
    year: '2024'
  }
];

const stats = [
  { number: '2000+', label: 'Patients Satisfaits' },
  { number: '15+', label: 'Années d\'Expérience' },
  { number: '500+', label: 'Implants Posés' },
  { number: '98%', label: 'Taux de Satisfaction' }
];

const quickServices = [
  {
    id: '1',
    name: 'Consultation',
    icon: Stethoscope,
    duration: '45 min',
    price: 'À partir de 300 DH',
    urgent: false
  },
  {
    id: '2',
    name: 'Détartrage',
    icon: Sparkles,
    duration: '30 min',
    price: 'À partir de 400 DH',
    urgent: false
  },
  {
    id: '3',
    name: 'Urgence 24h/24',
    icon: Zap,
    duration: '20 min',
    price: 'À partir de 500 DH',
    urgent: true
  }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

// const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

interface BookingStep {
  service: string | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
}

// Animation variants for modern micro-interactions
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeInOut" }
};

export default function DentistLandingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingStep>({
    service: null,
    date: null,
    time: null,
    name: '',
    phone: ''
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials with enhanced animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced scroll animations and entrance effects
  useEffect(() => {
    setIsVisible(true);
    
    // Mouse movement tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const openBooking = () => {
    setIsBookingOpen(true);
    setCurrentStep(1);
    setTimeout(() => scrollToSection('booking-section'), 300);
  };

  const handleServiceSelect = (serviceId: string) => {
    setBookingData({ ...bookingData, service: serviceId });
    setCurrentStep(2);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setBookingData({ ...bookingData, date });
      setCurrentStep(3);
    }
  };

  const handleTimeSelect = (time: string) => {
    setBookingData({ ...bookingData, time });
    setCurrentStep(4);
  };

  const handlePersonalInfo = () => {
    if (bookingData.name.trim() && bookingData.phone.trim()) {
      setCurrentStep(5);
    }
  };

  const resetBooking = () => {
    setBookingData({
      service: null,
      date: null,
      time: null,
      name: '',
      phone: ''
    });
    setCurrentStep(1);
    setIsBookingOpen(false);
  };

  const selectedService = quickServices.find(s => s.id === bookingData.service);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Dr. Yassine El Amrani</h1>
                <p className="text-sm text-neutral-600">Centre Dentaire Premium</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-neutral-700 hover:text-blue-600 font-medium transition-colors">À propos</button>
              <button onClick={() => scrollToSection('services')} className="text-neutral-700 hover:text-blue-600 font-medium transition-colors">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-neutral-700 hover:text-blue-600 font-medium transition-colors">Témoignages</button>
              <button onClick={() => scrollToSection('contact')} className="text-neutral-700 hover:text-blue-600 font-medium transition-colors">Contact</button>
              <Button onClick={openBooking} className="bg-blue-600 hover:bg-blue-700">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Rendez-vous
              </Button>
            </div>

            <div className="lg:hidden">
              <Button onClick={openBooking} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <CalendarIcon className="w-4 h-4 mr-2" />
                RDV
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Creative Animations */}
      <section 
        ref={heroRef}
        className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
      >
        {/* Animated Background Patterns */}
        <div className="absolute inset-0">
          {/* Floating Dental Elements */}
          <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <div className="w-8 h-8 bg-blue-200/30 rounded-full blur-sm" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            <div className="w-12 h-12 bg-teal-200/30 rounded-full blur-sm" />
          </div>
          <div className="absolute bottom-32 left-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            <div className="w-6 h-6 bg-blue-300/40 rounded-full blur-sm" />
          </div>
          
          {/* Parallax Background Elements */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div 
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Enhanced Hero Content with Creative Typography */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Animated Badge */}
                <div className="group">
                  <Badge className="bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 border border-blue-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default">
                    <Award className="w-4 h-4 mr-2 animate-pulse text-blue-600" />
                    <span className="font-medium">Excellence en Dentisterie depuis 2008</span>
                    <Sparkles className="w-3 h-3 ml-2 text-teal-600 animate-spin" style={{ animationDuration: '3s' }} />
                  </Badge>
                </div>
                
                {/* Creative Animated Heading */}
                <div className="relative">
                  <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                    <span className="inline-block hover:animate-pulse transition-all duration-300">
                      Votre sourire,
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-800 bg-clip-text text-transparent bg-size-200 animate-gradient relative">
                      <span className="relative z-10"> notre art</span>
                      {/* Dental tooth decoration */}
                      <div className="absolute -top-2 -right-12 lg:-right-16">
                        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
                          <Smile className="w-full h-full text-blue-600 p-1 lg:p-2" />
                        </div>
                      </div>
                    </span>
                  </h1>
                  
                  {/* Sparkle Effects */}
                  <div className="absolute -top-4 left-1/3 animate-ping">
                    <Sparkles className="w-4 h-4 text-blue-400/60" />
                  </div>
                  <div className="absolute top-1/2 -right-8 animate-ping" style={{ animationDelay: '1s' }}>
                    <Sparkles className="w-3 h-3 text-teal-400/60" />
                  </div>
                </div>
                
                {/* Enhanced Subtitle with Typing Effect */}
                <div className="relative">
                  <p className="text-xl lg:text-2xl text-neutral-700 leading-relaxed max-w-xl font-light">
                    Centre dentaire 
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> premium </span>
                    au cœur de Casablanca.
                    <br />
                    <span className="text-lg text-neutral-600">
                      Des soins de haute qualité dans un environnement moderne et chaleureux.
                    </span>
                  </p>
                  
                  {/* Fresh Dental Icons */}
                  <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="flex flex-col space-y-2 opacity-20">
                      <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                      <Shield className="w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <CheckCircle2 className="w-4 h-4 text-green-400 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Animated Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="group text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default border border-white/20"
                    style={{ 
                      animationDelay: `${index * 0.2}s`,
                      animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      {stat.label}
                    </div>
                    {/* Decorative element */}
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons with Creative Animations */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="xl" 
                  onClick={openBooking}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border-0"
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-teal-700 to-blue-800 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  
                  <div className="relative flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <span className="font-semibold">Prendre rendez-vous</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  
                  {/* Sparkle effect on hover */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-white/80 animate-spin" style={{ animationDuration: '1.5s' }} />
                  </div>
                </Button>
                
                <Button 
                  size="xl" 
                  variant="outline"
                  onClick={() => window.open('https://wa.me/212612345678', '_blank')}
                  className="group border-2 border-teal-300 hover:border-green-400 bg-white/80 hover:bg-green-50 backdrop-blur-sm relative overflow-hidden"
                >
                  {/* WhatsApp green hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <div className="relative flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3 text-green-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <span className="font-semibold text-neutral-700 group-hover:text-green-700 transition-colors">
                      Contact WhatsApp
                    </span>
                  </div>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-neutral-700 font-medium">4.9/5 sur Google</span>
                </div>
                <div className="w-1 h-6 bg-neutral-300 rounded-full" />
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-neutral-700">Certifié & Assuré</span>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Visual with Creative Animations */}
            <div className="relative animate-float">
              {/* Modern Dental Clinic Preview */}
              <div className="relative dental-gradient rounded-3xl shadow-2xl overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-600 via-teal-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }} />
                    <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                  </div>
                  
                  <div className="text-center text-white p-8 relative z-10">
                    {/* Animated dental clinic icon */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Building className="w-12 h-12 text-white animate-pulse" />
                      </div>
                      
                      {/* Floating dental icons */}
                      <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.5s' }}>
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                          <Smile className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '1s' }}>
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                      Cabinet Moderne
                    </h3>
                    <p className="text-blue-100 mb-6 group-hover:text-white transition-colors duration-300">
                      Découvrez notre environnement premium
                    </p>
                    
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="group/btn hover:bg-white hover:text-blue-600 transition-all duration-300"
                    >
                      <Play className="w-5 h-5 mr-2 group-hover/btn:scale-125 group-hover/btn:text-blue-600 transition-all duration-300" />
                      <span className="group-hover/btn:font-semibold">Visite virtuelle</span>
                    </Button>
                  </div>
                  
                  {/* Sparkle effects */}
                  <div className="absolute top-4 right-4 animate-ping" style={{ animationDelay: '2s' }}>
                    <Sparkles className="w-6 h-6 text-white/60" />
                  </div>
                  <div className="absolute bottom-4 left-4 animate-ping" style={{ animationDelay: '3s' }}>
                    <Sparkles className="w-4 h-4 text-white/40" />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating testimonial with animations */}
              <Card className="absolute -bottom-6 -left-6 glass-card border-0 max-w-sm transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:animate-pulse-glow">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        Sarah M.
                      </div>
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map((star, index) => (
                          <Star 
                            key={star} 
                            className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" 
                            style={{ animationDelay: `${index * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">
                    "Une expérience exceptionnelle ! Le Dr. El Amrani a transformé mon sourire."
                  </p>
                  
                  {/* Animated quote decoration */}
                  <div className="absolute -top-2 -right-2 text-blue-400/30 group-hover:text-blue-600/50 transition-colors">
                    <Quote className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional floating elements */}
              <div className="absolute -top-4 right-8 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full opacity-60 shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-teal-600/5 rounded-full blur-3xl" />
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-teal-50 text-teal-700 border-teal-200">
                  <Users className="w-4 h-4 mr-2" />
                  Plus de 15 ans d'excellence
                </Badge>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                  Un expert à votre service
                </h2>
                
                <p className="text-xl text-neutral-700 leading-relaxed">
                  Le Dr. Yassine El Amrani combine expertise technique et approche humaine pour offrir des soins dentaires d'exception. Diplômé des meilleures institutions, il met son savoir-faire au service de votre sourire.
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4 bg-gradient-to-br from-blue-50 to-teal-50 border-0">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-neutral-900 mb-1">{achievement.title}</h4>
                          <p className="text-sm text-neutral-600 mb-1">{achievement.subtitle}</p>
                          <span className="text-xs font-medium text-blue-600">{achievement.year}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={openBooking} className="bg-blue-600 hover:bg-blue-700">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                  Voir nos services
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Professional Photo */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Stethoscope className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Dr. Yassine El Amrani</h3>
                    <p className="text-blue-100 mb-4">Chirurgien-Dentiste</p>
                    <p className="text-sm text-blue-200">Photo professionnelle à venir</p>
                  </div>
                </div>
              </div>
              
              {/* Floating credentials */}
              <Card className="absolute top-6 -right-6 bg-white shadow-xl border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Certifié</div>
                      <div className="text-sm text-neutral-600">Ordre des Dentistes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with Creative Animations */}
      <section id="services" className="scroll-animate py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-teal-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            {/* Animated badge */}
            <div className="inline-block mb-4">
              <Badge className="bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 border-blue-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default">
                <Sparkles className="w-4 h-4 mr-2 animate-spin text-blue-600" style={{ animationDuration: '3s' }} />
                <span className="font-medium">Soins Premium</span>
                <div className="w-2 h-2 bg-teal-400 rounded-full ml-2 animate-pulse" />
              </Badge>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 hover:scale-105 transition-transform duration-500 cursor-default">
              Nos 
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                Spécialités
              </span>
            </h2>
            
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Une gamme complète de soins dentaires avec les 
              <span className="font-semibold text-teal-600">technologies les plus avancées</span> 
              pour tous vos besoins.
            </p>
            
            {/* Floating dental icons */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-10">
              <div className="flex space-x-8">
                <Target className="w-6 h-6 text-blue-400 animate-bounce" style={{ animationDelay: '0s' }} />
                <Smile className="w-6 h-6 text-teal-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <Heart className="w-6 h-6 text-blue-400 animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 cursor-pointer border-0 glass-card overflow-hidden relative"
                onClick={openBooking}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {/* Service Image with Creative Animations */}
                <div className="aspect-video bg-gradient-to-br from-blue-600 via-teal-600 to-blue-700 relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white rounded-full animate-ping group-hover:animate-bounce" style={{ animationDuration: '2s' }} />
                    <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-white rounded-full animate-ping group-hover:animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                  </div>
                  
                  {/* Dynamic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 group-hover:from-black/5 group-hover:to-black/10 transition-all duration-500" />
                  
                  {/* Animated service icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <service.icon className="w-16 h-16 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter group-hover:drop-shadow-2xl" />
                      
                      {/* Sparkle effects around icon */}
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Sparkles className="w-4 h-4 text-white/80 animate-spin" style={{ animationDuration: '2s' }} />
                      </div>
                      <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced price badge */}
                  <div className="absolute top-4 right-4 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Badge className="bg-white/95 text-neutral-900 shadow-lg font-semibold border border-white/50 backdrop-blur-sm">
                      {service.price}
                    </Badge>
                  </div>
                  
                  {/* Floating decoration */}
                  <div className="absolute top-4 left-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                    <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse" />
                  </div>
                </div>

                <CardContent className="p-6 relative">
                  {/* Animated title */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 group-hover:scale-105 transition-all duration-300">
                    {service.name}
                  </h3>
                  
                  {/* Description with hover effect */}
                  <p className="text-neutral-700 mb-4 leading-relaxed group-hover:text-neutral-800 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Enhanced Features with stagger animation */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300"
                        style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                      >
                        <div className="relative">
                          <CheckCircle2 className="w-4 h-4 text-green-600 group-hover:scale-125 group-hover:text-green-500 transition-all duration-300" />
                          <div className="absolute inset-0 bg-green-400/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-500 relative overflow-hidden group/btn">
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                    
                    <span className="relative flex items-center justify-center">
                      <span className="group-hover/btn:scale-105 transition-transform duration-300">
                        Réserver ce service
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" />
                    </span>
                    
                    {/* Button sparkle effect */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-3 h-3 text-white/60 animate-spin" style={{ animationDuration: '1.5s' }} />
                    </div>
                  </Button>
                </CardContent>
                
                {/* Card border glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg border-2 border-blue-400/30 animate-pulse-glow" />
                </div>
              </Card>
            ))}
          </div>

          {/* Enhanced Quick Booking CTA with Creative Design */}
          <Card className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-blue-700 border-0 text-white overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white rounded-full animate-ping" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
            </div>
            
            <CardContent className="p-8 lg:p-12 text-center relative z-10">
              {/* Animated emergency icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-glow">
                    <Zap className="w-10 h-10 text-white animate-bounce" />
                  </div>
                  
                  {/* Floating sparkles */}
                  <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }}>
                    <Sparkles className="w-6 h-6 text-white/70" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 animate-spin" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <Sparkles className="w-4 h-4 text-white/50" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                Besoin d'un rendez-vous 
                <span className="inline-block animate-pulse">⚡</span> 
                urgent ?
              </h3>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto group-hover:text-white transition-colors duration-300">
                Contactez-nous directement pour une prise en charge rapide ou réservez en ligne en quelques clics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="xl" 
                  variant="secondary" 
                  onClick={openBooking}
                  className="group/btn bg-white hover:bg-blue-50 text-blue-600 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  <CalendarIcon className="w-6 h-6 mr-3 relative z-10 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300" />
                  <span className="relative z-10 font-semibold">Réserver en ligne</span>
                </Button>
                
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 group/btn relative overflow-hidden"
                  onClick={() => window.open('tel:+212522123456', '_blank')}
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  <Phone className="w-6 h-6 mr-3 relative z-10 group-hover/btn:animate-bounce group-hover/btn:text-green-600" />
                  <span className="relative z-10 font-semibold">Appeler maintenant</span>
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-8 flex justify-center space-x-8 opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 animate-pulse" />
                  <span className="text-sm">Réponse rapide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-sm">Service garanti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 animate-pulse" style={{ animationDelay: '1s' }} />
                  <span className="text-sm">Soins d'urgence</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Témoignages
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Découvrez les expériences de nos patients et pourquoi ils recommandent notre cabinet.
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-0 shadow-xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <Quote className="w-16 h-16 text-blue-600 mx-auto" />
                  <blockquote className="text-2xl lg:text-3xl font-medium text-neutral-900 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-neutral-900">{testimonials[activeTestimonial].name}</div>
                      <div className="text-neutral-600">{testimonials[activeTestimonial].role}</div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg",
                  index === activeTestimonial ? "ring-2 ring-blue-600 shadow-lg" : ""
                )}
                onClick={() => setActiveTestimonial(index)}
              >
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">4.9/5</div>
                <div className="text-sm text-neutral-600">Note Google</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">2000+</div>
                <div className="text-sm text-neutral-600">Avis positifs</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-neutral-600">Recommandations</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">5★</div>
                <div className="text-sm text-neutral-600">Facebook</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      {isBookingOpen && (
      <section id="booking-wizard" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50/50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-h2 text-neutral-900 mb-4">
                Réserver votre rendez-vous
              </h2>
              <p className="text-lg text-neutral-600">
                Processus simple et rapide en 4 étapes
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                      currentStep >= step 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "bg-gray-200 text-gray-500"
                    )}>
                      {currentStep > step ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 5 && (
                      <div className={cn(
                        "w-8 h-1 mx-2 transition-colors duration-300",
                        currentStep > step ? "bg-blue-600" : "bg-gray-200"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="heading-h3 text-neutral-900 mb-2">
                        Choisissez votre service
                      </h3>
                      <p className="text-neutral-600">
                        Quel type de soins recherchez-vous ?
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {quickServices.map((service) => (
                        <Card 
                          key={service.id}
                          className={cn(
                            "cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-blue-300",
                            service.urgent ? "border-red-200 bg-red-50" : ""
                          )}
                          onClick={() => handleServiceSelect(service.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                service.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                              )}>
                                <service.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-lg font-semibold text-neutral-900">
                                    {service.name}
                                  </h4>
                                  {service.urgent && (
                                    <Badge className="bg-red-100 text-red-600 text-xs">Urgent</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-neutral-600">{service.duration} • {service.price}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-neutral-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date Selection */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="heading-h3 text-neutral-900 mb-2">
                        Choisissez une date
                      </h3>
                      <p className="text-neutral-600">
                        Sélectionnez le jour qui vous convient
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={bookingData.date || undefined}
                        onSelect={handleDateSelect}
                        disabled={(date) => 
                          date < new Date() || 
                          date.getDay() === 0 || // Sunday
                          date > addDays(new Date(), 30)
                        }
                        locale={fr}
                        className="rounded-xl shadow-lg bg-white"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="mr-4"
                      >
                        Retour
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Time Selection */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="heading-h3 text-neutral-900 mb-2">
                        Choisissez l'heure
                      </h3>
                      <p className="text-neutral-600">
                        Créneaux disponibles le {bookingData.date && format(bookingData.date, 'EEEE d MMMM', { locale: fr })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          className="h-12 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(2)}
                      >
                        Retour
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Personal Information */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="heading-h3 text-neutral-900 mb-2">
                        Vos informations
                      </h3>
                      <p className="text-neutral-600">
                        Dernière étape avant confirmation
                      </p>
                    </div>
                    <div className="space-y-6 max-w-md mx-auto">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          placeholder="Votre nom et prénom"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Numéro de téléphone *
                        </label>
                        <Input
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          placeholder="+212 6 12 34 56 78"
                          className="h-12"
                        />
                      </div>
                      
                      {/* Booking Summary */}
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-blue-900 mb-3">Récapitulatif</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Service:</span>
                              <span className="font-medium">{selectedService?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Date:</span>
                              <span className="font-medium">
                                {bookingData.date && format(bookingData.date, 'EEEE d MMMM', { locale: fr })}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Heure:</span>
                              <span className="font-medium">{bookingData.time}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(3)}
                      >
                        Retour
                      </Button>
                      <Button 
                        onClick={handlePersonalInfo}
                        disabled={!bookingData.name.trim() || !bookingData.phone.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Confirmer le rendez-vous
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div className="space-y-8 text-center">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <div>
                      <h3 className="heading-h3 text-neutral-900 mb-4">
                        Rendez-vous confirmé !
                      </h3>
                      <p className="text-lg text-neutral-600 mb-8">
                        Votre demande a été envoyée avec succès. Vous recevrez une confirmation par SMS dans les prochaines minutes.
                      </p>
                    </div>
                    
                    <Card className="bg-green-50 border-green-200 max-w-md mx-auto">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Patient:</span>
                            <span className="font-medium">{bookingData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Service:</span>
                            <span className="font-medium">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Date:</span>
                            <span className="font-medium">
                              {bookingData.date && format(bookingData.date, 'EEEE d MMMM', { locale: fr })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Heure:</span>
                            <span className="font-medium">{bookingData.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Téléphone:</span>
                            <span className="font-medium">{bookingData.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-center space-x-4">
                      <Button 
                        onClick={resetBooking}
                        variant="outline"
                      >
                        Nouveau rendez-vous
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => window.open('https://wa.me/212612345678?text=Bonjour, j\'ai réservé un rendez-vous', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-50 text-green-700 border-green-200 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Contact & Localisation
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Prenez rendez-vous
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Notre cabinet moderne vous accueille dans un environnement chaleureux au cœur de Casablanca.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="p-8 bg-gradient-to-br from-blue-600 to-teal-600 text-white border-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6">Contact Direct</h3>
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://wa.me/212612345678?text=Bonjour, je souhaite prendre rendez-vous', '_blank')}
                    >
                      <MessageCircle className="w-6 h-6 mr-4" />
                      <div className="text-left">
                        <div className="font-semibold">WhatsApp</div>
                        <div className="text-sm opacity-80">Réponse rapide garantie</div>
                      </div>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full justify-start border-white text-white hover:bg-white hover:text-blue-600"
                      onClick={() => window.open('tel:+212522123456', '_blank')}
                    >
                      <Phone className="w-6 h-6 mr-4" />
                      <div className="text-left">
                        <div className="font-semibold">+212 5 22 12 34 56</div>
                        <div className="text-sm opacity-80">Lun-Sam 9h-18h</div>
                      </div>
                    </Button>
                    <Button 
                      size="lg" 
                      onClick={openBooking}
                      variant="secondary"
                      className="w-full"
                    >
                      <CalendarIcon className="w-6 h-6 mr-4" />
                      Réservation en ligne
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Hours */}
              <div className="grid gap-6">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-2">Adresse</h4>
                        <p className="text-neutral-700 leading-relaxed">
                          123 Boulevard Mohammed V<br />
                          Résidence Al Manar, 2ème étage<br />
                          20000 Casablanca, Maroc
                        </p>
                        <Button variant="link" className="mt-2 p-0 h-auto text-blue-600">
                          Voir sur Google Maps
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-3">Horaires d'ouverture</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-neutral-700">Lundi - Vendredi</span>
                            <span className="font-semibold text-neutral-900">09:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-neutral-700">Samedi</span>
                            <span className="font-semibold text-neutral-900">09:00 - 14:00</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-neutral-700">Dimanche</span>
                            <span className="font-semibold text-red-600">Fermé</span>
                          </div>
                          <div className="mt-4 pt-3 border-t border-neutral-100">
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Ouvert maintenant</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-neutral-700 mb-2">
                        Localisation Premium
                      </h4>
                      <p className="text-neutral-600 mb-4">
                        Centre de Casablanca • Parking disponible
                      </p>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir la carte interactive
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Additional Features */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center bg-green-50 border-green-200">
                  <CardContent className="p-0">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-600 mb-1">Parking</div>
                    <div className="text-sm text-neutral-700">Gratuit & Sécurisé</div>
                  </CardContent>
                </Card>
                <Card className="p-4 text-center bg-blue-50 border-blue-200">
                  <CardContent className="p-0">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-600 mb-1">Assurance</div>
                    <div className="text-sm text-neutral-700">CNSS & Privée</div>
                  </CardContent>
                </Card>
                <Card className="p-4 text-center bg-purple-50 border-purple-200">
                  <CardContent className="p-0">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-purple-600 mb-1">Urgences</div>
                    <div className="text-sm text-neutral-700">24h/24 • 7j/7</div>
                  </CardContent>
                </Card>
                <Card className="p-4 text-center bg-teal-50 border-teal-200">
                  <CardContent className="p-0">
                    <Award className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-teal-600 mb-1">Certifié</div>
                    <div className="text-sm text-neutral-700">ISO 9001</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-h2 text-neutral-900 mb-4">
                Cabinet Dentaire
              </h2>
              <p className="text-lg text-neutral-600">
                Situé au cœur de Casablanca
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-0">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Adresse</h3>
                        <p className="text-neutral-600">
                          123 Boulevard Mohammed V<br />
                          Casablanca 20000, Maroc
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 border-0">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Horaires d'ouverture</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Lundi - Vendredi:</span>
                            <span className="font-medium">09:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Samedi:</span>
                            <span className="font-medium">09:00 - 14:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Dimanche:</span>
                            <span className="font-medium text-red-600">Fermé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://wa.me/212612345678', '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Contacter par WhatsApp
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('tel:+212612345678', '_blank')}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Appeler maintenant
                  </Button>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="space-y-6">
                <Card className="h-80 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <CardContent className="text-center p-6">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Intégration carte Google Maps<br />
                      <span className="text-sm">(à configurer en production)</span>
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center bg-blue-50 border-blue-200">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                      <div className="text-sm text-neutral-600">Patients satisfaits</div>
                    </CardContent>
                  </Card>
                  <Card className="p-4 text-center bg-teal-50 border-teal-200">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-teal-600 mb-1">10+</div>
                      <div className="text-sm text-neutral-600">Années d'expérience</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Dr. Yassine El Amrani</h3>
                  <p className="text-neutral-400">Centre Dentaire Premium</p>
                </div>
              </div>
              <p className="text-neutral-300 leading-relaxed max-w-md">
                Plus de 15 ans d'expertise en dentisterie moderne. Nous nous engageons à offrir des soins d'exception dans un environnement chaleureux et professionnel.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <Button size="icon" variant="outline" className="border-neutral-600 hover:bg-blue-600 hover:border-blue-600">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-neutral-600 hover:bg-pink-600 hover:border-pink-600">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-neutral-600 hover:bg-green-600 hover:border-green-600">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-neutral-600 hover:bg-blue-400 hover:border-blue-400">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Services</h4>
              <div className="space-y-3">
                {['Dentisterie Esthétique', 'Implantologie', 'Orthodontie', 'Chirurgie Orale', 'Parodontologie'].map((service, index) => (
                  <button key={index} className="block text-neutral-300 hover:text-white transition-colors text-left">
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-300 text-sm">
                    Boulevard Mohammed V<br />Casablanca, Maroc
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-300">+212 5 22 12 34 56</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-300">contact@dr-elamrani.ma</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-300 text-sm">
                    Lun-Ven: 9h-18h<br />Sam: 9h-14h
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-neutral-700 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-neutral-400 text-sm">
                © 2024 Dr. Yassine El Amrani. Tous droits réservés.
              </div>
              <div className="flex items-center space-x-6 text-sm text-neutral-400">
                <button className="hover:text-white transition-colors">Mentions légales</button>
                <button className="hover:text-white transition-colors">Politique de confidentialité</button>
                <button className="hover:text-white transition-colors">CGV</button>
                <span className="text-neutral-600">|</span>
                <span className="text-neutral-500">Propulsé par <span className="text-blue-400 font-semibold">Ocliq</span></span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}