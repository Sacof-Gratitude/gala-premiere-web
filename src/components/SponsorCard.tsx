
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Crown, Award, Medal, Info } from "lucide-react";

interface SponsorCardProps {
  sponsor: {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    website?: string;
    level: 'GOLD' | 'SILVER' | 'BRONZE' | 'PLATINUM';
    order_number?: number;
  };
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const truncateName = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'PLATINUM':
        return <Crown className="h-4 w-4" />;
      case 'GOLD':
        return <Award className="h-4 w-4" />;
      case 'SILVER':
        return <Medal className="h-4 w-4" />;
      case 'BRONZE':
        return <Star className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'PLATINUM':
        return 'from-slate-300 to-slate-500 text-slate-800';
      case 'GOLD':
        return 'from-yellow-300 to-yellow-500 text-yellow-800';
      case 'SILVER':
        return 'from-gray-300 to-gray-500 text-gray-800';
      case 'BRONZE':
        return 'from-orange-300 to-orange-500 text-orange-800';
      default:
        return 'from-gray-300 to-gray-500 text-gray-800';
    }
  };

  const getBorderColor = (level: string) => {
    switch (level) {
      case 'PLATINUM':
        return 'border-slate-400/60 hover:border-slate-400/80';
      case 'GOLD':
        return 'border-yellow-400/60 hover:border-yellow-400/80';
      case 'SILVER':
        return 'border-gray-400/60 hover:border-gray-400/80';
      case 'BRONZE':
        return 'border-orange-400/60 hover:border-orange-400/80';
      default:
        return 'border-yellow-400/20 hover:border-yellow-400/40';
    }
  };

  // Limite de caractères pour la description (2 lignes environ)
  const descriptionLimit = 80;

  return (
    <Card className={`bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm transition-all duration-300 group cursor-pointer h-full flex flex-col ${getBorderColor(sponsor.level)}`}>
      <CardHeader className="text-center pb-4 flex-shrink-0">
        <div className="mb-4 relative">
          {sponsor.logo ? (
            <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              {getLevelIcon(sponsor.level)}
            </div>
          )}
          
          <Badge className={`absolute -top-2 -right-2 bg-gradient-to-r ${getLevelColor(sponsor.level)} font-bold text-xs`}>
            {sponsor.level}
          </Badge>
        </div>
        
        <CardTitle 
          className="text-white group-hover:text-yellow-400 transition-colors text-lg leading-tight line-clamp-1"
          title={sponsor.name}
        >
          {truncateName(sponsor.name)}
        </CardTitle>
        
        {sponsor.description && (
          <CardDescription className="text-gray-300 text-sm relative min-h-[2.5rem] flex flex-col justify-start">
            <div className="line-clamp-2 leading-5">
              {showFullDescription ? sponsor.description : truncateText(sponsor.description, descriptionLimit)}
            </div>
            {sponsor.description.length > descriptionLimit && (
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-yellow-400 hover:text-yellow-300 mt-1 self-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDescription(!showFullDescription);
                }}
              >
                <Info className="h-3 w-3" />
              </Button>
            )}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="mt-auto pt-0 flex-shrink-0">
        {sponsor.website && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              window.open(sponsor.website, '_blank');
            }}
          >
            Visiter le site web
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SponsorCard;
