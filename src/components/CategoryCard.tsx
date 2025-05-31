
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Trophy } from "lucide-react";

interface Agency {
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
  category_id: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  criteria: string;
  order_number: number;
  gala_id: string;
  created_at: string;
  updated_at: string;
  agencies: Agency[];
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const nominees = category.agencies?.length || 0;

  return (
    <Card className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group cursor-pointer h-full">
      <CardHeader className="text-center pb-4">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
            <Trophy className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        <CardTitle className="text-white group-hover:text-yellow-400 transition-colors text-lg leading-tight">
          {category.name}
        </CardTitle>
        <CardDescription className="text-gray-300 text-sm">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
            <Users className="h-3 w-3 mr-1" />
            {nominees} nominé{nominees > 1 ? 's' : ''}
          </Badge>
        </div>

        {category.criteria && (
          <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-3 border border-gray-700">
            <strong className="text-gray-300">Critères:</strong> {category.criteria}
          </div>
        )}

        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
          >
            Voir les nominés
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
