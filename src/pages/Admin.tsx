
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useGalaData } from "@/hooks/useGalaData";

const Admin = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const { data, isLoading } = useGalaData(selectedYear);

  const sections = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Settings },
    { id: 'galas', label: 'Galas', icon: Trophy },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'categories', label: 'Catégories', icon: Award },
    { id: 'panels', label: 'Panels', icon: Calendar },
    { id: 'sponsors', label: 'Partenaires', icon: Handshake },
    { id: 'gallery', label: 'Galerie', icon: Image },
  ];

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
            <div className="text-sm text-gray-400">Participants</div>
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
            <div className="text-sm text-gray-400">Partenaires</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderParticipants = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Participants</h2>
        <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un participant
        </Button>
      </div>
      
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
                    <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-500">
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

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'participants':
        return renderParticipants();
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl">Section en développement</div>
            <p className="text-gray-500 mt-2">Cette section sera bientôt disponible</p>
          </div>
        );
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-4">
              <h3 className="text-white font-semibold mb-4">Administration</h3>
              
              {/* Sélecteur d'année */}
              <div className="mb-4">
                <Label className="text-gray-400 text-sm">Année du gala</Label>
                <div className="flex space-x-1 mt-2">
                  {[2023, 2024, 2025].map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      size="sm"
                      className={
                        selectedYear === year 
                          ? "bg-yellow-500 text-black" 
                          : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                      }
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
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
