
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
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ selectedYear, onYearChange, activeTab, onTabChange }: NavigationProps) => {
  const { data: galaYears } = useGalaYears();

  return (
    <nav className="w-full bg-black/90 backdrop-blur-sm border-b border-yellow-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onTabChange('accueil')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">GA</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-yellow-400">
                Gala de l'Excellence
              </h1>
              <p className="text-sm text-gray-400">Africaine</p>
            </div>
          </button>
          
          <div className="flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-yellow-400 hover:text-white">
                    Gala {selectedYear}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-4 w-48 bg-black border border-yellow-500/20">
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
            
            <div className="hidden md:flex space-x-4">
              <Button 
                variant={activeTab === 'nomines' ? "default" : "outline"}
                className={activeTab === 'nomines' 
                  ? "bg-yellow-500 text-black" 
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }
                onClick={() => onTabChange('nomines')}
              >
                Participants
              </Button>
              <Button 
                variant={activeTab === 'categories' ? "default" : "outline"}
                className={activeTab === 'categories' 
                  ? "bg-yellow-500 text-black" 
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }
                onClick={() => onTabChange('categories')}
              >
                Catégories
              </Button>
              <Button 
                variant={activeTab === 'panels' ? "default" : "outline"}
                className={activeTab === 'panels' 
                  ? "bg-yellow-500 text-black" 
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }
                onClick={() => onTabChange('panels')}
              >
                Panels
              </Button>
              <Button 
                variant={activeTab === 'galerie' ? "default" : "outline"}
                className={activeTab === 'galerie' 
                  ? "bg-yellow-500 text-black" 
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }
                onClick={() => onTabChange('galerie')}
              >
                Galerie
              </Button>
              <Button 
                variant={activeTab === 'sponsors' ? "default" : "outline"}
                className={activeTab === 'sponsors' 
                  ? "bg-yellow-500 text-black" 
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }
                onClick={() => onTabChange('sponsors')}
              >
                Partenaires
              </Button>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-yellow-400 hover:text-white">
                      Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-2 p-4 w-48 bg-black border border-yellow-500/20">
                        <Button
                          variant={activeTab === 'nomines' ? "default" : "ghost"}
                          className={`justify-start ${
                            activeTab === 'nomines' 
                              ? "bg-yellow-500 text-black" 
                              : "text-yellow-400 hover:text-white hover:bg-yellow-500/20"
                          }`}
                          onClick={() => onTabChange('nomines')}
                        >
                          Participants
                        </Button>
                        <Button
                          variant={activeTab === 'categories' ? "default" : "ghost"}
                          className={`justify-start ${
                            activeTab === 'categories' 
                              ? "bg-yellow-500 text-black" 
                              : "text-yellow-400 hover:text-white hover:bg-yellow-500/20"
                          }`}
                          onClick={() => onTabChange('categories')}
                        >
                          Catégories
                        </Button>
                        <Button
                          variant={activeTab === 'panels' ? "default" : "ghost"}
                          className={`justify-start ${
                            activeTab === 'panels' 
                              ? "bg-yellow-500 text-black" 
                              : "text-yellow-400 hover:text-white hover:bg-yellow-500/20"
                          }`}
                          onClick={() => onTabChange('panels')}
                        >
                          Panels
                        </Button>
                        <Button
                          variant={activeTab === 'galerie' ? "default" : "ghost"}
                          className={`justify-start ${
                            activeTab === 'galerie' 
                              ? "bg-yellow-500 text-black" 
                              : "text-yellow-400 hover:text-white hover:bg-yellow-500/20"
                          }`}
                          onClick={() => onTabChange('galerie')}
                        >
                          Galerie
                        </Button>
                        <Button
                          variant={activeTab === 'sponsors' ? "default" : "ghost"}
                          className={`justify-start ${
                            activeTab === 'sponsors' 
                              ? "bg-yellow-500 text-black" 
                              : "text-yellow-400 hover:text-white hover:bg-yellow-500/20"
                          }`}
                          onClick={() => onTabChange('sponsors')}
                        >
                          Partenaires
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
