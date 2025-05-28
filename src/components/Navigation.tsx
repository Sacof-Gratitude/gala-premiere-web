
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-yellow-400/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Gala Immobilier 2024
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#categories" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Catégories
            </a>
            <a href="#nominees" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Nominés
            </a>
            <a href="#sponsors" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Partenaires
            </a>
            <a href="#voting" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Votes
            </a>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700">
              Acheter des billets
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-yellow-400"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-yellow-400/20">
            <div className="flex flex-col space-y-4 mt-4">
              <a 
                href="#categories" 
                className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Catégories
              </a>
              <a 
                href="#nominees" 
                className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Nominés
              </a>
              <a 
                href="#sponsors" 
                className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Partenaires
              </a>
              <a 
                href="#voting" 
                className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Votes
              </a>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700 mt-4">
                Acheter des billets
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
