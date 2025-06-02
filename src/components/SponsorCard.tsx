
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Crown, Diamond, Award } from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  level: 'GOLD' | 'SILVER' | 'BRONZE' | 'PLATINUM';
  order_number?: number;
}

interface SponsorCardProps {
  sponsor: Sponsor;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'PLATINUM': return <Diamond className="h-4 w-4" />;
      case 'GOLD': return <Crown className="h-4 w-4" />;
      case 'SILVER': return <Award className="h-4 w-4" />;
      case 'BRONZE': return <Star className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'PLATINUM': 
        return {
          badge: 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 border-0 shadow-lg',
          card: 'from-gray-400/20 to-gray-600/30 border-gray-400/40'
        };
      case 'GOLD': 
        return {
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-0 shadow-lg',
          card: 'from-yellow-400/20 to-yellow-600/30 border-yellow-400/40'
        };
      case 'SILVER': 
        return {
          badge: 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 border-0 shadow-lg',
          card: 'from-gray-300/20 to-gray-500/30 border-gray-400/40'
        };
      case 'BRONZE': 
        return {
          badge: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white border-0 shadow-lg',
          card: 'from-orange-400/20 to-orange-600/30 border-orange-400/40'
        };
      default: 
        return {
          badge: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-0',
          card: 'from-gray-400/20 to-gray-600/30 border-gray-400/40'
        };
    }
  };

  const levelStyle = getLevelStyle(sponsor.level);

  return (
    <Card className={`bg-gradient-to-br ${levelStyle.card} backdrop-blur-sm hover:scale-105 transition-all duration-300 group h-full`}>
      <CardHeader className="text-center pb-4 relative">
        <Badge className={`absolute top-2 right-2 ${levelStyle.badge} px-2 py-1 text-xs font-bold`}>
          {getLevelIcon(sponsor.level)}
          <span className="ml-1">{sponsor.level}</span>
        </Badge>
        
        {sponsor.logo ? (
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg p-2 flex items-center justify-center shadow-lg">
            <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <div className={`w-20 h-20 bg-gradient-to-br ${levelStyle.card} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            {getLevelIcon(sponsor.level)}
          </div>
        )}
        
        <CardTitle className="text-white group-hover:text-yellow-400 transition-colors text-lg">
          {sponsor.name}
        </CardTitle>
        
        {sponsor.description && (
          <CardDescription className="text-gray-300 text-sm">
            {sponsor.description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {sponsor.website && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
            onClick={() => window.open(sponsor.website, '_blank')}
          >
            Visiter le site
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SponsorCard;
