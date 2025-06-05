
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trophy, Users, Award, Calendar, Image, Handshake, ChevronDown, Menu, X, LogOut } from "lucide-react";
import AdminLogin from './AdminLogin';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ selectedYear, onYearChange, activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();

  const tabs = [
    { id: 'nomines', label: 'Nominés', icon: Users },
    { id: 'categories', label: 'Catégories', icon: Award },
    { id: 'panels', label: 'Panels', icon: Calendar },
    { id: 'galerie', label: 'Galerie', icon: Image },
    { id: 'sponsors', label: 'Sponsors', icon: Handshake },
  ];

  const years = [2023, 2024, 2025];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAdminAccess = () => {
    if (isAdmin) {
      window.location.href = '/admin';
    }
  };

  const handleSuccessfulLogin = () => {
    // Attendre un peu que l'état soit mis à jour
    setTimeout(() => {
      window.location.href = '/admin';
    }, 500);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la déconnexion",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onTabChange('accueil')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl">Gala de l'Excellence</h1>
              <p className="text-yellow-400 text-sm">Africaine</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-4">
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
                    } transition-all duration-200`}
                    onClick={() => onTabChange(tab.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>

            {/* Year Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  {selectedYear}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-yellow-500/30">
                {years.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => onYearChange(year)}
                    className="text-white hover:bg-yellow-500/20 hover:text-yellow-400 cursor-pointer"
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Auth Section */}
            {user && isAdmin ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  onClick={handleAdminAccess}
                >
                  Interface Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <AdminLogin onSuccessfulLogin={handleSuccessfulLogin} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Year Dropdown Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  {selectedYear}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-yellow-500/30">
                {years.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => onYearChange(year)}
                    className="text-white hover:bg-yellow-500/20 hover:text-yellow-400 cursor-pointer"
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-yellow-500 hover:bg-yellow-500/20"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-yellow-500/20 mt-4">
            <div className="flex flex-col space-y-2 pt-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`${
                      activeTab === tab.id 
                        ? "bg-yellow-500 text-black" 
                        : "text-gray-300 hover:text-white hover:bg-yellow-500/20"
                    } justify-start w-full`}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </Button>
                );
              })}
              
              {/* Mobile Auth Section */}
              {user && isAdmin ? (
                <>
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black justify-start w-full"
                    onClick={() => {
                      handleAdminAccess();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Interface Admin
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white justify-start w-full"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <div className="w-full">
                  <AdminLogin onSuccessfulLogin={() => {
                    handleSuccessfulLogin();
                    setIsMobileMenuOpen(false);
                  }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
