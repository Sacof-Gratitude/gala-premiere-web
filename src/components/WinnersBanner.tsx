
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown } from "lucide-react";

interface Winner {
  id: string;
  name: string;
  category: string;
  type: string;
  location: string;
}

interface WinnersBannerProps {
  winners: Winner[];
  galaYear: number;
}

const WinnersBanner = ({ winners, galaYear }: WinnersBannerProps) => {
  if (winners.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <Trophy className="h-8 w-8 text-yellow-400 mr-3" />
          Lauréats {galaYear}
        </h2>
        <p className="text-gray-400">
          Découvrez les gagnants de cette édition exceptionnelle
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((winner) => (
          <Card key={winner.id} className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border-yellow-400/40 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-black" />
              </div>
              
              <Badge className="mb-3 bg-yellow-400 text-black font-bold">
                GAGNANT
              </Badge>
              
              <h3 className="text-white font-bold text-lg mb-2">{winner.name}</h3>
              <p className="text-yellow-400 font-medium mb-1">{winner.category}</p>
              <p className="text-gray-300 text-sm">{winner.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WinnersBanner;
