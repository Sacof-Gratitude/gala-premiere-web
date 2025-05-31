
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useGalaYears } from '@/hooks/useGalaData';

interface NavigationProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const Navigation = ({ selectedYear, onYearChange }: NavigationProps) => {
  const { data: galaYears } = useGalaYears();

  return (
    <nav className="w-full bg-black/90 backdrop-blur-sm border-b border-yellow-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">GA</span>
            </div>
            <h1 className="text-xl font-bold text-yellow-400">
              Gala Immobilier Africain
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-yellow-400 hover:text-white">
                    Gala {selectedYear}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-4 w-48">
                      {galaYears?.map((gala) => (
                        <Button
                          key={gala.year}
                          variant={selectedYear === gala.year ? "default" : "ghost"}
                          className={`justify-start ${
                            selectedYear === gala.year 
                              ? "bg-yellow-500 text-black" 
                              : "text-yellow-400 hover:text-white hover:bg-yellow-500/20"
                          }`}
                          onClick={() => onYearChange(gala.year)}
                        >
                          {gala.year} {gala.status === 'ENDED' ? '(Terminé)' : ''}
                        </Button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                Panels
              </Button>
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                Galerie
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
