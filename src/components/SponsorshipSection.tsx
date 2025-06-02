
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Diamond, Star, MessageCircle } from "lucide-react";

const sponsorshipTiers = [
  {
    level: 'PLATINUM',
    price: '50,000€',
    color: 'from-gray-400 to-gray-600',
    icon: <Diamond className="h-8 w-8" />,
    benefits: [
      'Logo principal sur tous les supports',
      'Stand premium (20m²)',
      'Intervention lors de la cérémonie',
      '10 invitations VIP',
      'Mention dans tous les communiqués',
      'Partenariat exclusif catégorie'
    ]
  },
  {
    level: 'GOLD',
    price: '30,000€',
    color: 'from-yellow-400 to-yellow-600',
    icon: <Crown className="h-8 w-8" />,
    benefits: [
      'Logo sur tous les supports',
      'Stand premium (15m²)',
      'Présentation produit/service',
      '6 invitations VIP',
      'Mention réseaux sociaux',
      'Accès networking exclusif'
    ]
  },
  {
    level: 'SILVER',
    price: '15,000€',
    color: 'from-gray-300 to-gray-500',
    icon: <Star className="h-8 w-8" />,
    benefits: [
      'Logo support principal',
      'Stand standard (10m²)',
      '4 invitations',
      'Mention programme officiel',
      'Accès cocktail networking'
    ]
  },
  {
    level: 'BRONZE',
    price: '8,000€',
    color: 'from-orange-400 to-orange-600',
    icon: <Star className="h-8 w-8" />,
    benefits: [
      'Logo programme',
      'Espace exposition (5m²)',
      '2 invitations',
      'Mention réseaux sociaux'
    ]
  }
];

const SponsorshipSection = () => {
  const handleBecomeSponsors = () => {
    const message = encodeURIComponent("Bonjour, je souhaiterais devenir sponsor du Gala de l'Immobilier Africain. Pouvez-vous me donner plus d'informations ?");
    window.open(`https://wa.me/+33123456789?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">
          Devenez Sponsor du Gala
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Rejoignez les leaders de l'immobilier africain et bénéficiez d'une visibilité exceptionnelle 
          auprès des professionnels les plus influents du secteur.
        </p>
        <Button 
          onClick={handleBecomeSponsors}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Devenir Sponsor sur WhatsApp
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sponsorshipTiers.map((tier) => (
          <Card key={tier.level} className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 h-full">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                {tier.icon}
              </div>
              <CardTitle className="text-white text-xl">
                {tier.level}
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-yellow-400">
                {tier.price}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleBecomeSponsors}
                variant="outline" 
                className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                Choisir {tier.level}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SponsorshipSection;
