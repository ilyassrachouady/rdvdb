import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { UserPlus, Mail, Lock, User, Sparkles, Stethoscope, Heart, Shield, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(email, password, name);
      if (success) {
        toast.success('Compte créé avec succès');
        navigate('/dashboard');
      } else {
        toast.error('Erreur lors de la création du compte');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 relative overflow-hidden">
      {/* Background Decorations - Matching LoginPage */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          
          {/* Top Branding Section - Matching LoginPage */}
          <div className="text-center mb-6">
            <div className="relative mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-xl">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">DentalFlow</h1>
            <p className="text-slate-600 font-medium">Gestion dentaire professionnelle</p>
            <div className="flex items-center justify-center gap-4 mt-3 text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-medium">Sécurisé</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-medium">Intuitif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs font-medium">Moderne</span>
              </div>
            </div>
          </div>

          {/* Registration Form Card - Matching LoginPage Structure */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/20 p-6 border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Créer un compte</CardTitle>
                  <CardDescription className="text-slate-600">
                    Rejoignez la communauté des dentistes digitaux
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-5">
                {/* Full Name Field - Matching LoginPage Input Style */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-slate-700 block">Nom complet</Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-2.5 w-2.5 text-white" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. Ahmed Benali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-0 bg-slate-50 focus:bg-white font-medium shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      required
                    />
                  </div>
                </div>

                {/* Email Field - Matching LoginPage Style */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-slate-700 block">Email professionnel</Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Mail className="h-2.5 w-2.5 text-white" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="dr.benali@clinique.ma"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-0 bg-slate-50 focus:bg-white font-medium shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      required
                    />
                  </div>
                </div>

                {/* Password Field - Matching LoginPage Style */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-bold text-slate-700 block">Mot de passe</Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Lock className="h-2.5 w-2.5 text-white" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-0 bg-slate-50 focus:bg-white font-medium shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Confirm Password Field - Matching LoginPage Style */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 block">Confirmer mot de passe</Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-0 bg-slate-50 focus:bg-white font-medium shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-slate-500 ml-1">Minimum 6 caractères</p>
                </div>
              </CardContent>

              <CardFooter className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/20 p-6 border-t-0">
                <div className="w-full space-y-4">
                  {/* Main Submit Button - Matching LoginPage */}
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Création du compte...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Créer mon compte dentiste
                      </div>
                    )}
                  </Button>

                  {/* Terms */}
                  <p className="text-xs text-slate-500 text-center">
                    En créant un compte, vous acceptez nos conditions d'utilisation
                  </p>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-sm text-slate-600">
                      Vous avez déjà un compte ?{' '}
                      <Link 
                        to="/login" 
                        className="font-bold text-teal-600 hover:text-teal-700 transition-colors"
                      >
                        Se connecter
                      </Link>
                    </p>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

