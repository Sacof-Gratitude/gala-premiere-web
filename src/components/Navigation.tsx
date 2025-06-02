
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Users, Award, Calendar, Image, Handshake, LogIn } from "lucide-react";

interface NavigationProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ selectedYear, onYearChange, activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: Trophy },
    { id: 'nomines', label: 'Participants', icon: Users },
    { id: 'categories', label: 'Catégories', icon: Award },
    { id: 'panels', label: 'Panels', icon: Calendar },
    { id: 'galerie', label: 'Galerie', icon: Image },
    { id: 'sponsors', label: 'Partenaires', icon: Handshake },
  ];

  const years = [2023, 2024, 2025];

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 space-y-4 lg:space-y-0">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onTabChange('accueil')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Gala de l'Excellence</h1>
              <p className="text-yellow-400 text-sm">Africaine</p>
            </div>
          </div>

          {/* Navigation principale */}
          <div className="flex flex-wrap gap-2 lg:gap-4 justify-center lg:justify-start">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`${
                    activeTab === tab.id 
                      ? "bg-yellow-500 text-black hover:bg-yellow-600" 
                      : "text-gray-300 hover:text-white hover:bg-yellow-500/20"
                  } transition-all duration-200 text-sm lg:text-base`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Sélecteur d'année et connexion */}
          <div className="flex items-center space-x-4 justify-center lg:justify-end">
            <div className="flex space-x-1">
              {years.map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedYear === year 
                      ? "bg-yellow-500 text-black border-yellow-500" 
                      : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  }
                  onClick={() => onYearChange(year)}
                >
                  {year}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              onClick={() => onTabChange('admin')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
