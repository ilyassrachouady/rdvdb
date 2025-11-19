import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  Shield,
  DollarSign,
  Clock,
  Search,
  Filter,
  Save,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  priceWithoutCNSS: number;
  priceWithCNSS: number;
  isActive: boolean;
  createdAt: string;
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Consultation initiale',
    description: 'Première consultation avec examen clinique complet',
    priceWithoutCNSS: 200,
    priceWithCNSS: 150,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Détartrage',
    description: 'Nettoyage professionnel des dents',
    priceWithoutCNSS: 300,
    priceWithCNSS: 200,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Obturation amalgame',
    description: 'Restauration dentaire avec amalgame',
    priceWithoutCNSS: 400,
    priceWithCNSS: 280,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Extraction dentaire simple',
    description: 'Extraction simple d\'une dent',
    priceWithoutCNSS: 350,
    priceWithCNSS: 250,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    name: 'Couronne céramique',
    description: 'Pose d\'une couronne en céramique',
    priceWithoutCNSS: 1500,
    priceWithCNSS: 1200,
    isActive: true,
    createdAt: '2024-01-15',
  },
];

export default function ServicesPage() {
  const { dentist } = useAuth();
  const [services, setServices] = useState<Service[]>(mockServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceWithoutCNSS: '',
    priceWithCNSS: '',
    isActive: true,
  });

  useEffect(() => {
    applyFilters();
  }, [services, searchTerm]);

  const applyFilters = () => {
    let filtered = [...services];

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      priceWithoutCNSS: '',
      priceWithCNSS: '',
      isActive: true,
    });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      priceWithoutCNSS: service.priceWithoutCNSS.toString(),
      priceWithCNSS: service.priceWithCNSS.toString(),
      isActive: service.isActive,
    });
    setShowAddDialog(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.priceWithoutCNSS || !formData.priceWithCNSS) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);

    const serviceData: Service = {
      id: editingService?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      priceWithoutCNSS: parseFloat(formData.priceWithoutCNSS),
      priceWithCNSS: parseFloat(formData.priceWithCNSS),
      isActive: formData.isActive,
      createdAt: editingService?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? serviceData : s));
      toast.success('Service modifié avec succès');
    } else {
      setServices(prev => [...prev, serviceData]);
      toast.success('Service ajouté avec succès');
    }

    setIsLoading(false);
    setShowAddDialog(false);
    resetForm();
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    toast.success('Service supprimé');
  };

  const toggleServiceStatus = (id: string) => {
    setServices(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    resetForm();
    setEditingService(null);
  };

  return (
    <div className="container mx-auto max-w-screen-2xl space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 min-h-screen">
      {/* Hero Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 rounded-3xl opacity-95"></div>
        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Gestion des Services</h1>
                  <p className="text-blue-100 mt-1 text-lg">
                    Gérez vos services dentaires et tarifications CNSS
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      resetForm();
                      setEditingService(null);
                    }}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-2xl px-6 py-3 h-auto font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Nouveau Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-0 shadow-2xl rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <Stethoscope className="h-6 w-6 text-teal-600" />
                      {editingService ? 'Modifier le service' : 'Nouveau service'}
                    </DialogTitle>
                    <DialogDescription className="text-slate-600">
                      {editingService ? 'Modifiez les informations du service' : 'Ajoutez un nouveau service à votre catalogue'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du service *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Consultation initiale"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Description du service..."
                        className="rounded-xl min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priceWithoutCNSS" className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Prix sans CNSS (MAD) *
                        </Label>
                        <Input
                          id="priceWithoutCNSS"
                          type="number"
                          value={formData.priceWithoutCNSS}
                          onChange={(e) => setFormData(prev => ({ ...prev, priceWithoutCNSS: e.target.value }))}
                          placeholder="200"
                          className="rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="priceWithCNSS" className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          Prix avec CNSS (MAD) *
                        </Label>
                        <Input
                          id="priceWithCNSS"
                          type="number"
                          value={formData.priceWithCNSS}
                          onChange={(e) => setFormData(prev => ({ ...prev, priceWithCNSS: e.target.value }))}
                          placeholder="150"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={handleCloseDialog} className="rounded-xl">
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 rounded-xl">
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Enregistrement...' : editingService ? 'Modifier' : 'Ajouter'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">Total Services</p>
                <p className="text-3xl font-bold text-slate-900">{services.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Stethoscope className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">Services Actifs</p>
                <p className="text-3xl font-bold text-slate-900">{services.filter(s => s.isActive).length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">Prix Moyen</p>
                <p className="text-3xl font-bold text-slate-900">
                  {services.length > 0 ? Math.round(services.reduce((acc, s) => acc + s.priceWithoutCNSS, 0) / services.length) : 0} MAD
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Table */}
      <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/20 p-6 border-b border-slate-200/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                Catalogue des services
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                {filteredServices.length} services disponibles
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-[300px] rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-bold text-slate-700 p-4">Service</TableHead>
                  <TableHead className="font-bold text-slate-700 p-4">Prix sans CNSS</TableHead>
                  <TableHead className="font-bold text-slate-700 p-4">Prix avec CNSS</TableHead>
                  <TableHead className="font-bold text-slate-700 p-4">Statut</TableHead>
                  <TableHead className="font-bold text-slate-700 p-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="p-4">
                      <div>
                        <p className="font-bold text-slate-900">{service.name}</p>
                        {service.description && (
                          <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="font-bold text-slate-900 text-lg">{service.priceWithoutCNSS} MAD</div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-700 text-lg">{service.priceWithCNSS} MAD</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <button
                        onClick={() => toggleServiceStatus(service.id)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                          service.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {service.isActive ? 'Actif' : 'Inactif'}
                      </button>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="rounded-xl h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                          className="rounded-xl h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}