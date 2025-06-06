
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, MapPin, Users, Calendar, ExternalLink, Eye, EyeOff } from "lucide-react";

interface Nominee {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  specialties?: string;
  achievements?: string;
  website?: string;
  vote_url?: string;
  team_size?: number;
  founded_year?: number;
  is_winner: boolean;
  category_id: string;
}

interface NomineeCardProps {
  nominee: Nominee;
}

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSpecialties, setShowFullSpecialties] = useState(false);
  const [showFullAchievements, setShowFullAchievements] = useState(false);

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2">{nominee.name}</h3>
            {nominee.is_winner && (
              <Badge className="bg-yellow-400 text-black font-bold mb-2">
                <Trophy className="h-3 w-3 mr-1" />
                GAGNANT
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {showFullDescription ? nominee.description : truncateText(nominee.description)}
              {nominee.description.length > 120 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-yellow-400 hover:text-yellow-300 p-0 h-auto ml-1"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
              {nominee.type}
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {nominee.location}
            </Badge>
            {nominee.team_size && nominee.team_size > 0 && (
              <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                <Users className="h-3 w-3 mr-1" />
                {nominee.team_size} personnes
              </Badge>
            )}
            {nominee.founded_year && (
              <Badge variant="outline" className="border-orange-500 text-orange-400 text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {nominee.founded_year}
              </Badge>
            )}
          </div>

          {nominee.specialties && (
            <div>
              <h4 className="text-yellow-400 font-medium text-sm mb-1">Spécialités</h4>
              <p className="text-gray-400 text-xs">
                {showFullSpecialties ? nominee.specialties : truncateText(nominee.specialties, 80)}
                {nominee.specialties.length > 80 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300 p-0 h-auto ml-1"
                    onClick={() => setShowFullSpecialties(!showFullSpecialties)}
                  >
                    {showFullSpecialties ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                )}
              </p>
            </div>
          )}

          {nominee.achievements && (
            <div>
              <h4 className="text-yellow-400 font-medium text-sm mb-1">Réalisations</h4>
              <p className="text-gray-400 text-xs">
                {showFullAchievements ? nominee.achievements : truncateText(nominee.achievements, 80)}
                {nominee.achievements.length > 80 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300 p-0 h-auto ml-1"
                    onClick={() => setShowFullAchievements(!showFullAchievements)}
                  >
                    {showFullAchievements ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
          {nominee.website && (
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
              onClick={() => window.open(nominee.website, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Site web
            </Button>
          )}
          {nominee.vote_url && (
            <Button
              size="sm"
              className="bg-yellow-500 text-black hover:bg-yellow-600 flex-1"
              onClick={() => window.open(nominee.vote_url, '_blank')}
            >
              <Trophy className="h-3 w-3 mr-1" />
              Voter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NomineeCard;
