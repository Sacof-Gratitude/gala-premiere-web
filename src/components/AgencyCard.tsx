
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Award, ArrowRight, Crown } from "lucide-react";

interface Agency {
  id: string;
  name: string;
  type: string;
  description: string;
  logo?: string;
  website?: string;
  specialties: string;
  achievements: string;
  team_size?: number;
  founded_year?: number;
  location: string;
  vote_url: string;
  is_winner: boolean;
}

interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard = ({ agency }: AgencyCardProps) => {
  const typeColors = {
    'Entreprise Technologique': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
    'Incubateur': 'bg-green-500/20 text-green-400 border-green-400/30',
    'Organisation Professionnelle': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
    'Entreprise': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
    'Startup': 'bg-orange-500/20 text-orange-400 border-orange-400/30'
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/60 to-black/80 border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Badge className={`absolute top-4 right-4 ${typeColors[agency.type as keyof typeof typeColors] || 'bg-gray-500/20 text-gray-400'}`}>
          {agency.type}
        </Badge>
        {agency.is_winner && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold shadow-lg">
            <Crown className="h-3 w-3 mr-1" />
            GAGNANT
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-black" />
            </div>
            <div>
              <CardTitle className="text-white group-hover:text-yellow-400 transition-colors text-lg">
                {agency.name}
              </CardTitle>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {agency.location}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-gray-300 text-sm leading-relaxed">
          {agency.description}
        </CardDescription>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-yellow-400 font-medium text-sm mb-1">Spécialités</h4>
            <p className="text-gray-300 text-xs">{agency.specialties}</p>
          </div>
          
          <div>
            <h4 className="text-yellow-400 font-medium text-sm mb-1">Réalisations</h4>
            <p className="text-gray-300 text-xs">{agency.achievements}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            {agency.team_size && (
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {agency.team_size} employés
              </div>
            )}
            {agency.founded_year && (
              <div className="flex items-center">
                <Award className="h-3 w-3 mr-1" />
                Créée en {agency.founded_year}
              </div>
            )}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          onClick={() => window.open(agency.vote_url, '_blank')}
        >
          Voter pour ce participant
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgencyCard;
