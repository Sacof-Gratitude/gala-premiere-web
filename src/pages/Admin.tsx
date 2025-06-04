
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CalendarIcon, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useGalaData } from "@/hooks/useGalaData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminSearchBar from "@/components/AdminSearchBar";

const Admin = () => {
  const [activeSection, setActiveSection] = useState('galas');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const { data, refetch } = useGalaData();
  const { toast } = useToast();

  const sections = [
    { id: 'galas', name: 'Galas', icon: Calendar },
    { id: 'categories', name: 'Catégories', icon: Plus },
    { id: 'nominees', name: 'Nominés', icon: Plus },
    { id: 'panels', name: 'Panels', icon: Plus },
    { id: 'sponsors', name: 'Sponsors', icon: Plus },
    { id: 'gallery', name: 'Galerie', icon: Plus },
  ];

  const resetForm = () => {
    setFormData({});
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!formData || Object.keys(formData).length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      let result;
      
      switch (activeSection) {
        case 'galas':
          if (editingItem) {
            const { error } = await supabase
              .from('galas')
              .update({
                title: formData.title,
                description: formData.description,
                year: parseInt(formData.year),
                event_date: formData.event_date,
                venue: formData.venue,
                status: formData.status,
                is_active: formData.is_active || false,
                ticketing_url: formData.ticketing_url,
                max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
                nomination_start_date: formData.nomination_start_date,
                nomination_end_date: formData.nomination_end_date,
                voting_start_date: formData.voting_start_date,
                voting_end_date: formData.voting_end_date
              })
              .eq('id', editingItem.id);
            result = { error };
          } else {
            const { error } = await supabase
              .from('galas')
              .insert({
                title: formData.title,
                description: formData.description,
                year: parseInt(formData.year),
                event_date: formData.event_date,
                venue: formData.venue,
                status: formData.status || 'DRAFT',
                is_active: formData.is_active || false,
                ticketing_url: formData.ticketing_url,
                max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
                nomination_start_date: formData.nomination_start_date,
                nomination_end_date: formData.nomination_end_date,
                voting_start_date: formData.voting_start_date,
                voting_end_date: formData.voting_end_date
              });
            result = { error };
          }
          break;

        case 'categories':
          if (editingItem) {
            const { error } = await supabase
              .from('categories')
              .update({
                name: formData.name,
                description: formData.description,
                criteria: formData.criteria,
                order_number: parseInt(formData.order_number),
                gala_id: formData.gala_id
              })
              .eq('id', editingItem.id);
            result = { error };
          } else {
            const { error } = await supabase
              .from('categories')
              .insert({
                name: formData.name,
                description: formData.description,
                criteria: formData.criteria,
                order_number: parseInt(formData.order_number),
                gala_id: formData.gala_id
              });
            result = { error };
          }
          break;

        case 'nominees':
          if (editingItem) {
            const { error } = await supabase
              .from('agencies')
              .update({
                name: formData.name,
                description: formData.description,
                type: formData.type,
                location: formData.location,
                achievements: formData.achievements,
                specialties: formData.specialties,
                website: formData.website,
                logo: formData.logo,
                vote_url: formData.vote_url,
                team_size: formData.team_size ? parseInt(formData.team_size) : null,
                founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
                is_winner: formData.is_winner || false,
                category_id: formData.category_id
              })
              .eq('id', editingItem.id);
            result = { error };
          } else {
            const { error } = await supabase
              .from('agencies')
              .insert({
                name: formData.name,
                description: formData.description,
                type: formData.type,
                location: formData.location,
                achievements: formData.achievements,
                specialties: formData.specialties,
                website: formData.website,
                logo: formData.logo,
                vote_url: formData.vote_url,
                team_size: formData.team_size ? parseInt(formData.team_size) : null,
                founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
                is_winner: formData.is_winner || false,
                category_id: formData.category_id
              });
            result = { error };
          }
          break;

        case 'panels':
          if (editingItem) {
            const { error } = await supabase
              .from('panels')
              .update({
                title: formData.title,
                description: formData.description,
                theme: formData.theme,
                moderator_name: formData.moderator_name,
                moderator_bio: formData.moderator_bio,
                moderator_image: formData.moderator_image,
                start_time: formData.start_time,
                end_time: formData.end_time,
                order_number: parseInt(formData.order_number),
                gala_id: formData.gala_id
              })
              .eq('id', editingItem.id);
            result = { error };
          } else {
            const { error } = await supabase
              .from('panels')
              .insert({
                title: formData.title,
                description: formData.description,
                theme: formData.theme,
                moderator_name: formData.moderator_name,
                moderator_bio: formData.moderator_bio,
                moderator_image: formData.moderator_image,
                start_time: formData.start_time,
                end_time: formData.end_time,
                order_number: parseInt(formData.order_number),
                gala_id: formData.gala_id
              });
            result = { error };
          }
          break;

        case 'sponsors':
          if (editingItem) {
            const { error } = await supabase
              .from('sponsors')
              .update({
                name: formData.name,
                description: formData.description,
                level: formData.level,
                logo: formData.logo,
                website: formData.website,
                order_number: formData.order_number ? parseInt(formData.order_number) : null,
                gala_id: formData.gala_id
              })
              .eq('id', editingItem.id);
            result = { error };
          } else {
            const { error } = await supabase
              .from('sponsors')
              .insert({
                name: formData.name,
                description: formData.description,
                level: formData.level,
                logo: formData.logo,
                website: formData.website,
                order_number: formData.order_number ? parseInt(formData.order_number) : null,
                gala_id: formData.gala_id
              });
            result = { error };
          }
          break;

        case 'gallery':
          if (editingItem) {
            const { error } = await supabase
              .from('gallery_images')
              .update({
                image_url: formData.image_url,
                caption: formData.caption,
                category: formData.category,
                photographer: formData.photographer,
                order_number: formData.order_number ? parseInt(formData.order_number) : null,
                gala_id: formData.gala_id
              })
              .eq('id', editingItem.id);
            result = { error };
          } else {
            const { error } = await supabase
              .from('gallery_images')
              .insert({
                image_url: formData.image_url,
                caption: formData.caption,
                category: formData.category,
                photographer: formData.photographer,
                order_number: formData.order_number ? parseInt(formData.order_number) : null,
                gala_id: formData.gala_id
              });
            result = { error };
          }
          break;
      }

      if (result?.error) {
        throw result.error;
      }

      toast({
        title: "Succès",
        description: `${editingItem ? 'Modification' : 'Ajout'} effectué avec succès`,
      });

      setIsDialogOpen(false);
      resetForm();
      refetch();
      
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      return;
    }

    setIsLoading(true);
    try {
      let result;
      
      switch (activeSection) {
        case 'galas':
          result = await supabase.from('galas').delete().eq('id', item.id);
          break;
        case 'categories':
          result = await supabase.from('categories').delete().eq('id', item.id);
          break;
        case 'nominees':
          result = await supabase.from('agencies').delete().eq('id', item.id);
          break;
        case 'panels':
          result = await supabase.from('panels').delete().eq('id', item.id);
          break;
        case 'sponsors':
          result = await supabase.from('sponsors').delete().eq('id', item.id);
          break;
        case 'gallery':
          result = await supabase.from('gallery_images').delete().eq('id', item.id);
          break;
      }

      if (result?.error) {
        throw result.error;
      }

      toast({
        title: "Succès",
        description: "Élément supprimé avec succès",
      });

      refetch();
      
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la suppression",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    resetForm();
    // Pré-remplir avec des valeurs par défaut selon la section
    const defaultData: any = {};
    
    if (data?.gala?.id) {
      defaultData.gala_id = data.gala.id;
    }
    
    if (activeSection === 'categories' && data?.categories?.length) {
      defaultData.order_number = data.categories.length + 1;
    }
    
    if (activeSection === 'panels' && data?.panels?.length) {
      defaultData.order_number = data.panels.length + 1;
    }
    
    if (activeSection === 'sponsors') {
      defaultData.level = 'BRONZE';
      if (data?.sponsors?.length) {
        defaultData.order_number = data.sponsors.length + 1;
      }
    }

    setFormData(defaultData);
    setIsDialogOpen(true);
  };

  const renderDatePicker = (value: string, onChange: (date: string) => void, placeholder: string) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
            !value && "text-gray-400"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), "dd MMMM yyyy", { locale: fr }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
        <CalendarComponent
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onChange(date ? date.toISOString().split('T')[0] : '')}
          initialFocus
          className="bg-gray-800 text-white"
        />
      </PopoverContent>
    </Popover>
  );

  const renderForm = () => {
    switch (activeSection) {
      case 'galas':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white">Titre</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Année</Label>
              <Input
                type="number"
                value={formData.year || ''}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Date de l'événement</Label>
              {renderDatePicker(
                formData.event_date || '', 
                (date) => setFormData({...formData, event_date: date}),
                "Sélectionner une date"
              )}
            </div>
            <div>
              <Label className="text-white">Lieu</Label>
              <Input
                value={formData.venue || ''}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Statut</Label>
              <Select value={formData.status || 'DRAFT'} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="DRAFT">Brouillon</SelectItem>
                  <SelectItem value="NOMINATIONS_OPEN">Nominations ouvertes</SelectItem>
                  <SelectItem value="VOTING_OPEN">Votes ouverts</SelectItem>
                  <SelectItem value="ENDED">Terminé</SelectItem>
                  <SelectItem value="ARCHIVED">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">URL de billetterie</Label>
              <Input
                value={formData.ticketing_url || ''}
                onChange={(e) => setFormData({...formData, ticketing_url: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Nombre maximum de participants</Label>
              <Input
                type="number"
                value={formData.max_participants || ''}
                onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white">Nom</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Critères</Label>
              <Textarea
                value={formData.criteria || ''}
                onChange={(e) => setFormData({...formData, criteria: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Numéro d'ordre</Label>
              <Input
                type="number"
                value={formData.order_number || ''}
                onChange={(e) => setFormData({...formData, order_number: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
          </div>
        );

      case 'nominees':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white">Nom</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Type</Label>
              <Input
                value={formData.type || ''}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Localisation</Label>
              <Input
                value={formData.location || ''}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Réalisations</Label>
              <Textarea
                value={formData.achievements || ''}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Spécialités</Label>
              <Textarea
                value={formData.specialties || ''}
                onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">URL de vote</Label>
              <Input
                value={formData.vote_url || ''}
                onChange={(e) => setFormData({...formData, vote_url: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Catégorie</Label>
              <Select value={formData.category_id || ''} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {data?.categories?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Site web</Label>
              <Input
                value={formData.website || ''}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Logo (URL)</Label>
              <Input
                value={formData.logo || ''}
                onChange={(e) => setFormData({...formData, logo: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Taille de l'équipe</Label>
              <Input
                type="number"
                value={formData.team_size || ''}
                onChange={(e) => setFormData({...formData, team_size: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Année de fondation</Label>
              <Input
                type="number"
                value={formData.founded_year || ''}
                onChange={(e) => setFormData({...formData, founded_year: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
        );

      case 'panels':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white">Titre</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Thème</Label>
              <Input
                value={formData.theme || ''}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Nom du modérateur</Label>
              <Input
                value={formData.moderator_name || ''}
                onChange={(e) => setFormData({...formData, moderator_name: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Bio du modérateur</Label>
              <Textarea
                value={formData.moderator_bio || ''}
                onChange={(e) => setFormData({...formData, moderator_bio: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Image du modérateur (URL)</Label>
              <Input
                value={formData.moderator_image || ''}
                onChange={(e) => setFormData({...formData, moderator_image: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Numéro d'ordre</Label>
              <Input
                type="number"
                value={formData.order_number || ''}
                onChange={(e) => setFormData({...formData, order_number: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
          </div>
        );

      case 'sponsors':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white">Nom</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Niveau</Label>
              <Select value={formData.level || 'BRONZE'} onValueChange={(value) => setFormData({...formData, level: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="PLATINUM">Platine</SelectItem>
                  <SelectItem value="GOLD">Or</SelectItem>
                  <SelectItem value="SILVER">Argent</SelectItem>
                  <SelectItem value="BRONZE">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Logo (URL)</Label>
              <Input
                value={formData.logo || ''}
                onChange={(e) => setFormData({...formData, logo: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Site web</Label>
              <Input
                value={formData.website || ''}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Numéro d'ordre</Label>
              <Input
                type="number"
                value={formData.order_number || ''}
                onChange={(e) => setFormData({...formData, order_number: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-white">URL de l'image</Label>
              <Input
                value={formData.image_url || ''}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Légende</Label>
              <Input
                value={formData.caption || ''}
                onChange={(e) => setFormData({...formData, caption: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Catégorie</Label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Photographe</Label>
              <Input
                value={formData.photographer || ''}
                onChange={(e) => setFormData({...formData, photographer: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Numéro d'ordre</Label>
              <Input
                type="number"
                value={formData.order_number || ''}
                onChange={(e) => setFormData({...formData, order_number: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSearchSelect = (item: any) => {
    console.log('Élément sélectionné:', item);
    // Ici vous pouvez ajouter la logique pour naviguer vers l'élément ou le mettre en surbrillance
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'galas':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Galas</h3>
              <div className="flex items-center space-x-4">
                <AdminSearchBar
                  activeSection={activeSection}
                  data={data}
                  onSelectItem={handleSearchSelect}
                  placeholder="Rechercher un gala..."
                />
                <Button onClick={handleAdd} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un gala
                </Button>
              </div>
            </div>
            
            {data?.gala && (
              <Card className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {data.gala.title}
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(data.gala)} size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(data.gala)} 
                        size="sm"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{data.gala.description}</p>
                  <p className="text-gray-400 mt-2">Année: {data.gala.year}</p>
                  <p className="text-gray-400">Lieu: {data.gala.venue}</p>
                  <p className="text-gray-400">Statut: {data.gala.status}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Catégories</h3>
              <div className="flex items-center space-x-4">
                <AdminSearchBar
                  activeSection={activeSection}
                  data={data}
                  onSelectItem={handleSearchSelect}
                  placeholder="Rechercher une catégorie..."
                />
                <Button onClick={handleAdd} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une catégorie
                </Button>
              </div>
            </div>
            
            {data?.categories?.map((category: any) => (
              <Card key={category.id} className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {category.name}
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(category)} size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(category)} 
                        size="sm"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{category.description}</p>
                  <p className="text-gray-400 mt-2">Ordre: {category.order_number}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'nominees':
        const nominees = data?.categories?.flatMap((cat: any) => 
          cat.agencies?.map((agency: any) => ({ ...agency, category_name: cat.name })) || []
        ) || [];
        
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Nominés</h3>
              <div className="flex items-center space-x-4">
                <AdminSearchBar
                  activeSection={activeSection}
                  data={data}
                  onSelectItem={handleSearchSelect}
                  placeholder="Rechercher un nominé..."
                />
                <Button onClick={handleAdd} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un nominé
                </Button>
              </div>
            </div>
            
            {nominees.map((nominee: any) => (
              <Card key={nominee.id} className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {nominee.name}
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(nominee)} size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(nominee)} 
                        size="sm"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{nominee.description}</p>
                  <p className="text-gray-400 mt-2">Catégorie: {nominee.category_name}</p>
                  <p className="text-gray-400">Type: {nominee.type}</p>
                  <p className="text-gray-400">Localisation: {nominee.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'panels':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Panels</h3>
              <div className="flex items-center space-x-4">
                <AdminSearchBar
                  activeSection={activeSection}
                  data={data}
                  onSelectItem={handleSearchSelect}
                  placeholder="Rechercher un panel..."
                />
                <Button onClick={handleAdd} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un panel
                </Button>
              </div>
            </div>
            
            {data?.panels?.map((panel: any) => (
              <Card key={panel.id} className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {panel.title}
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(panel)} size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(panel)} 
                        size="sm"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{panel.description}</p>
                  <p className="text-gray-400 mt-2">Thème: {panel.theme}</p>
                  <p className="text-gray-400">Modérateur: {panel.moderator_name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'sponsors':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Sponsors</h3>
              <div className="flex items-center space-x-4">
                <AdminSearchBar
                  activeSection={activeSection}
                  data={data}
                  onSelectItem={handleSearchSelect}
                  placeholder="Rechercher un sponsor..."
                />
                <Button onClick={handleAdd} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un sponsor
                </Button>
              </div>
            </div>
            
            {data?.sponsors?.map((sponsor: any) => (
              <Card key={sponsor.id} className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {sponsor.name}
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(sponsor)} size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(sponsor)} 
                        size="sm"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{sponsor.description}</p>
                  <p className="text-gray-400 mt-2">Niveau: {sponsor.level}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Galerie</h3>
              <div className="flex items-center space-x-4">
                <AdminSearchBar
                  activeSection={activeSection}
                  data={data}
                  onSelectItem={handleSearchSelect}
                  placeholder="Rechercher une image..."
                />
                <Button onClick={handleAdd} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une image
                </Button>
              </div>
            </div>
            
            {data?.gallery?.map((image: any) => (
              <Card key={image.id} className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex justify-between items-center">
                    {image.caption || 'Image sans titre'}
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(image)} size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(image)} 
                        size="sm"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Catégorie: {image.category || 'Non spécifiée'}</p>
                  <p className="text-gray-400">Photographe: {image.photographer || 'Non spécifié'}</p>
                  {image.image_url && (
                    <img src={image.image_url} alt={image.caption} className="mt-2 max-w-48 h-32 object-cover rounded" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return <div className="text-white">Sélectionnez une section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">Administration</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-yellow-500 text-black'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-600 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? `Modifier ${activeSection}` : `Ajouter ${activeSection}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {renderForm()}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleSave} 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    'Sauvegarder'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
