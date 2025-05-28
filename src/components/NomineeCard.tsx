
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Building2, Heart, Star } from "lucide-react";

interface NomineeCardProps {
  id: number;
  name: string;
  company: string;
  category: string;
  description: string;
  image: string;
  projectDetails?: string;
  votes?: number;
  isWinner?: boolean;
  onViewProfile?: () => void;
  onVote?: () => void;
  votingEnabled?: boolean;
}

const NomineeCard: React.FC<NomineeCardProps> = ({
  id,
  name,
  company,
  category,
  description,
  image,
  projectDetails,
  votes = 0,
  isWinner = false,
  onViewProfile,
  onVote,
  votingEnabled = false
}) => {
  return (
    <Card className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group overflow-hidden h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-4 right-4 bg-yellow-400 text-black font-medium">
          {category}
        </Badge>
        
        {/* Winner Badge */}
        {isWinner && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold">
            <Award className="h-3 w-3 mr-1" />
            GAGNANT
          </Badge>
        )}
        
        {/* Vote Count */}
        {votes > 0 && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Heart className="h-3 w-3 text-red-400 fill-current" />
            <span className="text-white text-xs font-medium">{votes}</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-white group-hover:text-yellow-400 transition-colors leading-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-yellow-400 font-medium flex items-center">
          <Building2 className="h-4 w-4 mr-1" />
          {company}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        
        {projectDetails && (
          <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-3 border border-gray-700">
            <strong className="text-gray-300">Détails du projet:</strong> {projectDetails}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 mr-1" />
              <span>Nominé</span>
            </div>
            {votes > 0 && (
              <div className="flex items-center">
                <Heart className="h-3 w-3 text-red-400 mr-1" />
                <span>{votes} votes</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
            onClick={onViewProfile}
          >
            Voir le profil complet
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {votingEnabled && !isWinner && (
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700"
              onClick={onVote}
            >
              <Heart className="mr-2 h-4 w-4" />
              Voter pour ce nominé
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NomineeCard;
