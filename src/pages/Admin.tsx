import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Trophy, 
  Users, 
  Award, 
  Calendar, 
  Image, 
  Handshake, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  X,
  Settings,
  Home,
  Crown,
  Medal,
  Star,
  Upload
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useGalaData } from "@/hooks/useGalaData";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [typeInput, setTypeInput] = useState('');
  const [typeSuggestions, setTypeSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const { data, isLoading, refetch } = useGalaData(selectedYear);

  // Types/secteurs existants pour les suggestions
  const existingTypes = [
    'Agence de Communication',
    'Agence Digitale', 
    'Production Audiovisuelle',
    'Relations Publiques',
    'Marketing Digital',
    'Événementiel',
    'Design Graphique',
    'Développement Web',
    'Consulting',
    'Media'
  ];

  const sections = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Settings },
    { id: 'galas', label: 'Galas', icon: Trophy },
    { id: 'categories', label: 'Catégories', icon: Award },
    { id: 'nominees', label: 'Nominés', icon: Users },
    { id: 'panels', label: 'Panels', icon: Calendar },
    { id: 'sponsors', label: 'Sponsors', icon: Handshake },
    { id: 'gallery', label: 'Galerie', icon: Image },
  ];

  const handleCreate = async (table: 'agencies' | 'categories' | 'galas' | 'panels' | 'sponsors' | 'gallery_images' | 'panel_speakers', data: any) => {
    try {
      const { error } = await supabase.from(table).insert([data]);
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Élément créé avec succès",
      });
      
      refetch();
      setIsEditing(false);
      setFormData({});
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (table: 'agencies' | 'categories' | 'galas' | 'panels' | 'sponsors' | 'gallery_images' | 'panel_speakers', id: string, data: any) => {
    try {
      const { error } = await supabase.from(table).update(data).eq('id', id);
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Élément mis à jour avec succès",
      });
      
      refetch();
      setIsEditing(false);
      setEditingItem(null);
      setFormData({});
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (table: 'agencies' | 'categories' | 'galas' | 'panels' | 'sponsors' | 'gallery_images' | 'panel_speakers', id: string) => {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Élément supprimé avec succès",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleTypeInputChange = (value: string) => {
    setTypeInput(value);
    setFormData({...formData, type: value});
    
    if (value) {
      const filtered = existingTypes.filter(type => 
        type.toLowerCase().includes(value.toLowerCase())
      );
      setTypeSuggestions(filtered);
    } else {
      setTypeSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setTypeInput(suggestion);
    setFormData({...formData, type: suggestion});
    setTypeSuggestions([]);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tableau de bord - Gala {selectedYear}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">1</div>
            <div className="text-sm text-gray-400">Gala actif</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">
              {data?.categories.reduce((acc, cat) => acc + (cat.agencies?.length || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-400">Nominés</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{data?.categories.length || 0}</div>
            <div className="text-sm text-gray-400">Catégories</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <Handshake className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{data?.sponsors.length || 0}</div>
            <div className="text-sm text-gray-400">Sponsors</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGalas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Galas</h2>
        <Button 
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => {
            setIsEditing(true);
            setEditingItem(null);
            setFormData({
              title: '',
              description: '',
              year: new Date().getFullYear(),
              venue: 'Cotonou, Bénin',
              event_date: '',
              status: 'DRAFT',
              is_active: false
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un gala
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Modifier le gala' : 'Ajouter un gala'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Titre</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Année</Label>
                <Input
                  type="number"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Lieu</Label>
                <Input
                  value={formData.venue || ''}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Date de l'événement</Label>
                <Input
                  type="datetime-local"
                  value={formData.event_date || ''}
                  onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  if (editingItem) {
                    handleUpdate('galas', editingItem.id, formData);
                  } else {
                    handleCreate('galas', formData);
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="border-gray-600 text-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {[data?.gala].filter(Boolean).map(gala => (
          <Card key={gala?.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{gala?.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{gala?.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">{gala?.year}</Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400">{gala?.venue}</Badge>
                    <Badge variant="outline" className="border-purple-500 text-purple-400">{gala?.status}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500"
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(gala);
                      setFormData({...gala});
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Catégories</h2>
        <Button 
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => {
            setIsEditing(true);
            setEditingItem(null);
            setFormData({
              name: '',
              description: '',
              criteria: '',
              order_number: 1,
              gala_id: data?.gala?.id || ''
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une catégorie
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Nom</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Ordre</Label>
                <Input
                  type="number"
                  value={formData.order_number || ''}
                  onChange={(e) => setFormData({...formData, order_number: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-gray-300">Critères</Label>
              <Textarea
                value={formData.criteria || ''}
                onChange={(e) => setFormData({...formData, criteria: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  if (editingItem) {
                    handleUpdate('categories', editingItem.id, formData);
                  } else {
                    handleCreate('categories', {...formData, gala_id: data?.gala?.id});
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="border-gray-600 text-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        {data?.categories.map(category => (
          <Card key={category.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{category.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">Ordre: {category.order_number}</Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400">{category.agencies?.length || 0} nominés</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500"
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(category);
                      setFormData({...category});
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500 text-red-500"
                    onClick={() => handleDelete('categories', category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNominees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Nominés</h2>
        <Button 
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => {
            setIsEditing(true);
            setEditingItem(null);
            setFormData({
              name: '',
              description: '',
              type: '',
              location: '',
              specialties: '',
              achievements: '',
              website: '',
              vote_url: '',
              team_size: '',
              founded_year: '',
              category_id: data?.categories[0]?.id || '',
              is_winner: false
            });
            setTypeInput('');
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un nominé
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Modifier le nominé' : 'Ajouter un nominé'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Nom</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="relative">
                <Label className="text-gray-300">Type/Secteur</Label>
                <Input
                  value={typeInput}
                  onChange={(e) => handleTypeInputChange(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Tapez pour rechercher ou ajouter un type..."
                />
                {typeSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {typeSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 text-white hover:bg-gray-700 cursor-pointer"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label className="text-gray-300">Localisation</Label>
                <Input
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Catégorie</Label>
                <Select
                  value={formData.category_id || ''}
                  onValueChange={(value) => setFormData({...formData, category_id: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {data?.categories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-white">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Spécialités</Label>
                <Textarea
                  value={formData.specialties || ''}
                  onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={2}
                />
              </div>
              <div>
                <Label className="text-gray-300">Réalisations</Label>
                <Textarea
                  value={formData.achievements || ''}
                  onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Site web</Label>
                <Input
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">URL de vote</Label>
                <Input
                  value={formData.vote_url || ''}
                  onChange={(e) => setFormData({...formData, vote_url: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Taille équipe</Label>
                <Input
                  type="number"
                  value={formData.team_size || ''}
                  onChange={(e) => setFormData({...formData, team_size: parseInt(e.target.value) || null})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  if (editingItem) {
                    handleUpdate('agencies', editingItem.id, formData);
                  } else {
                    handleCreate('agencies', formData);
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                  setTypeInput('');
                }}
                className="border-gray-600 text-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        {data?.categories.map(category => 
          category.agencies?.map(agency => (
            <Card key={agency.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-white font-semibold">{agency.name}</h3>
                      {agency.is_winner && <Badge className="bg-yellow-400 text-black">Gagnant</Badge>}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{agency.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline" className="border-blue-500 text-blue-400">{agency.type}</Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400">{agency.location}</Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-400">{category.name}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-yellow-500 text-yellow-500"
                      onClick={() => {
                        setIsEditing(true);
                        setEditingItem(agency);
                        setFormData({...agency});
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500 text-red-500"
                      onClick={() => handleDelete('agencies', agency.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  const renderPanels = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Panels</h2>
        <Button 
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => {
            setIsEditing(true);
            setEditingItem(null);
            setFormData({
              title: '',
              description: '',
              theme: '',
              moderator_name: '',
              moderator_bio: '',
              start_time: '',
              end_time: '',
              order_number: 1,
              gala_id: data?.gala?.id || ''
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un panel
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Modifier le panel' : 'Ajouter un panel'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Titre</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Thème</Label>
                <Input
                  value={formData.theme || ''}
                  onChange={(e) => setFormData({...formData, theme: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Modérateur</Label>
                <Input
                  value={formData.moderator_name || ''}
                  onChange={(e) => setFormData({...formData, moderator_name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Ordre</Label>
                <Input
                  type="number"
                  value={formData.order_number || ''}
                  onChange={(e) => setFormData({...formData, order_number: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Bio du modérateur</Label>
              <Textarea
                value={formData.moderator_bio || ''}
                onChange={(e) => setFormData({...formData, moderator_bio: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Heure de début</Label>
                <Input
                  type="datetime-local"
                  value={formData.start_time || ''}
                  onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Heure de fin</Label>
                <Input
                  type="datetime-local"
                  value={formData.end_time || ''}
                  onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  if (editingItem) {
                    handleUpdate('panels', editingItem.id, formData);
                  } else {
                    handleCreate('panels', {...formData, gala_id: data?.gala?.id});
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="border-gray-600 text-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {data?.panels.map(panel => (
          <Card key={panel.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{panel.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{panel.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">{panel.theme}</Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400">{panel.moderator_name}</Badge>
                    <Badge variant="outline" className="border-purple-500 text-purple-400">Ordre: {panel.order_number}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500"
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(panel);
                      setFormData({...panel});
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500 text-red-500"
                    onClick={() => handleDelete('panels', panel.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSponsors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Sponsors</h2>
        <Button 
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => {
            setIsEditing(true);
            setEditingItem(null);
            setFormData({
              name: '',
              description: '',
              level: 'BRONZE',
              website: '',
              logo: '',
              order_number: 1,
              gala_id: data?.gala?.id || ''
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un sponsor
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Modifier le sponsor' : 'Ajouter un sponsor'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Nom</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Niveau</Label>
                <Select
                  value={formData.level || 'BRONZE'}
                  onValueChange={(value) => setFormData({...formData, level: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="PLATINUM" className="text-white">PLATINUM</SelectItem>
                    <SelectItem value="GOLD" className="text-white">GOLD</SelectItem>
                    <SelectItem value="SILVER" className="text-white">SILVER</SelectItem>
                    <SelectItem value="BRONZE" className="text-white">BRONZE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Site web</Label>
                <Input
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Logo URL</Label>
                <Input
                  value={formData.logo || ''}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Ordre</Label>
                <Input
                  type="number"
                  value={formData.order_number || ''}
                  onChange={(e) => setFormData({...formData, order_number: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  if (editingItem) {
                    handleUpdate('sponsors', editingItem.id, formData);
                  } else {
                    handleCreate('sponsors', {...formData, gala_id: data?.gala?.id});
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="border-gray-600 text-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {data?.sponsors.map(sponsor => (
          <Card key={sponsor.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-semibold">{sponsor.name}</h3>
                    <Badge className={`${
                      sponsor.level === 'PLATINUM' ? 'bg-slate-300 text-slate-800' :
                      sponsor.level === 'GOLD' ? 'bg-yellow-400 text-yellow-800' :
                      sponsor.level === 'SILVER' ? 'bg-gray-300 text-gray-800' :
                      'bg-orange-400 text-orange-800'
                    }`}>
                      {sponsor.level === 'PLATINUM' && <Crown className="h-3 w-3 mr-1" />}
                      {sponsor.level === 'GOLD' && <Trophy className="h-3 w-3 mr-1" />}
                      {sponsor.level === 'SILVER' && <Medal className="h-3 w-3 mr-1" />}
                      {sponsor.level === 'BRONZE' && <Star className="h-3 w-3 mr-1" />}
                      {sponsor.level}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{sponsor.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">Ordre: {sponsor.order_number}</Badge>
                    {sponsor.website && <Badge variant="outline" className="border-green-500 text-green-400">Site web</Badge>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500"
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(sponsor);
                      setFormData({...sponsor});
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500 text-red-500"
                    onClick={() => handleDelete('sponsors', sponsor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion de la Galerie</h2>
        <Button 
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => {
            setIsEditing(true);
            setEditingItem(null);
            setFormData({
              image_url: '',
              caption: '',
              category: '',
              photographer: '',
              order_number: 1,
              gala_id: data?.gala?.id || ''
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une image
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Modifier l\'image' : 'Ajouter une image'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">URL de l'image</Label>
                <Input
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Catégorie</Label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Légende</Label>
              <Textarea
                value={formData.caption || ''}
                onChange={(e) => setFormData({...formData, caption: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Photographe</Label>
                <Input
                  value={formData.photographer || ''}
                  onChange={(e) => setFormData({...formData, photographer: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Ordre</Label>
                <Input
                  type="number"
                  value={formData.order_number || ''}
                  onChange={(e) => setFormData({...formData, order_number: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  if (editingItem) {
                    handleUpdate('gallery_images', editingItem.id, formData);
                  } else {
                    handleCreate('gallery_images', {...formData, gala_id: data?.gala?.id});
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="border-gray-600 text-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.gallery.map(image => (
          <Card key={image.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-700 rounded-lg mb-3 overflow-hidden">
                {image.image_url ? (
                  <img 
                    src={image.image_url} 
                    alt={image.caption || 'Image de galerie'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {image.caption && <p className="text-white text-sm">{image.caption}</p>}
                <div className="flex flex-wrap gap-1 text-xs">
                  {image.category && <Badge variant="outline" className="border-blue-500 text-blue-400">{image.category}</Badge>}
                  {image.photographer && <Badge variant="outline" className="border-green-500 text-green-400">{image.photographer}</Badge>}
                  <Badge variant="outline" className="border-purple-500 text-purple-400">#{image.order_number}</Badge>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500 flex-1"
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(image);
                      setFormData({...image});
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500 text-red-500 flex-1"
                    onClick={() => handleDelete('gallery_images', image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'galas':
        return renderGalas();
      case 'categories':
        return renderCategories();
      case 'nominees':
        return renderNominees();
      case 'panels':
        return renderPanels();
      case 'sponsors':
        return renderSponsors();
      case 'gallery':
        return renderGallery();
      default:
        return renderDashboard();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Barre de navigation admin */}
      <div className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white font-bold text-xl">Administration - Gala {selectedYear}</h1>
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              onClick={() => window.location.href = '/'}
            >
              <Home className="h-4 w-4 mr-2" />
              Retour au site
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-4">
              <h3 className="text-white font-semibold mb-4">Administration</h3>
              
              {/* Sélecteur d'année */}
              <div className="mb-4">
                <Label className="text-gray-400 text-sm">Année du gala</Label>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {[2023, 2024, 2025].map((year) => (
                      <SelectItem key={year} value={year.toString()} className="text-white">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Menu de navigation */}
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeSection === section.id 
                          ? "bg-yellow-500 text-black" 
                          : "text-gray-300 hover:text-white hover:bg-yellow-500/20"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {section.label}
                    </Button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700 min-h-[600px]">
              <CardContent className="p-6">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
