
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Building2, MapPin, Users, Calendar, Star, Info } from "lucide-react";

interface AgencyCardProps {
  agency: {
    id: string;
    name: string;
    description: string;
    location: string;
    type: string;
    specialties: string;
    achievements: string;
    logo?: string;
    website?: string;
    vote_url: string;
    team_size?: number;
    founded_year?: number;
    is_winner: boolean;
  };
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSpecialties, setShowFullSpecialties] = useState(false);
  const [showFullAchievements, setShowFullAchievements] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className={`bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm transition-all duration-300 group cursor-pointer h-full ${
      agency.is_winner 
        ? 'border-yellow-400/60 hover:border-yellow-400/80' 
        : 'border-yellow-400/20 hover:border-yellow-400/40'
    }`}>
      <CardHeader className="text-center pb-4 relative">
        {agency.is_winner && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold">
            <Award className="h-3 w-3 mr-1" />
            GAGNANT
          </Badge>
        )}
        
        <div className="mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 ${
            agency.is_winner 
              ? 'from-yellow-400/40 to-yellow-600/40' 
              : 'from-yellow-400/20 to-yellow-600/20'
          }`}>
            <Building2 className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <CardTitle className="text-white group-hover:text-yellow-400 transition-colors text-lg leading-tight">
          {agency.name}
        </CardTitle>
        
        <CardDescription className="text-gray-300 text-sm relative">
          {showFullDescription ? agency.description : truncateText(agency.description, 80)}
          {agency.description.length > 80 && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-yellow-400 hover:text-yellow-300 ml-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullDescription(!showFullDescription);
              }}
            >
              <Info className="h-3 w-3" />
            </Button>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            {agency.type}
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {agency.location}
          </Badge>
          {agency.team_size && (
            <Badge variant="outline" className="border-purple-500 text-purple-400 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {agency.team_size}
            </Badge>
          )}
          {agency.founded_year && (
            <Badge variant="outline" className="border-orange-500 text-orange-400 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {agency.founded_year}
            </Badge>
          )}
        </div>

        {agency.specialties && (
          <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-3 border border-gray-700">
            <strong className="text-gray-300 flex items-center mb-1">
              <Star className="h-3 w-3 mr-1" />
              Spécialités:
            </strong>
            <span>
              {showFullSpecialties ? agency.specialties : truncateText(agency.specialties, 80)}
              {agency.specialties.length > 80 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-yellow-400 hover:text-yellow-300 ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullSpecialties(!showFullSpecialties);
                  }}
                >
                  <Info className="h-3 w-3" />
                </Button>
              )}
            </span>
          </div>
        )}

        {agency.achievements && (
          <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-3 border border-gray-700">
            <strong className="text-gray-300 flex items-center mb-1">
              <Award className="h-3 w-3 mr-1" />
              Réalisations:
            </strong>
            <span>
              {showFullAchievements ? agency.achievements : truncateText(agency.achievements, 80)}
              {agency.achievements.length > 80 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-yellow-400 hover:text-yellow-300 ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullAchievements(!showFullAchievements);
                  }}
                >
                  <Info className="h-3 w-3" />
                </Button>
              )}
            </span>
          </div>
        )}

        <div className="space-y-2">
          {agency.website && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              onClick={() => window.open(agency.website, '_blank')}
            >
              Visiter le site web
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {agency.vote_url && (
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-600 hover:to-yellow-700"
              onClick={() => window.open(agency.vote_url, '_blank')}
            >
              <Star className="mr-2 h-4 w-4" />
              Voter pour ce nominé
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyCard;
