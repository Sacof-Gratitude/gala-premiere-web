
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Crown, Diamond } from "lucide-react";

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
      case 'SILVER': return <Star className="h-4 w-4" />;
      case 'BRONZE': return <Star className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'PLATINUM': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'GOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'SILVER': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'BRONZE': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group h-full">
      <CardHeader className="text-center pb-4">
        {sponsor.logo ? (
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg p-2 flex items-center justify-center">
            <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            {getLevelIcon(sponsor.level)}
          </div>
        )}
        
        <Badge className={`mb-2 ${getLevelColor(sponsor.level)}`}>
          {getLevelIcon(sponsor.level)}
          <span className="ml-1">{sponsor.level}</span>
        </Badge>
        
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
