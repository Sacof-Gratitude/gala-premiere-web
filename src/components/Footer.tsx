
import React from 'react';
import { Card } from "@/components/ui/card";
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black via-slate-900 to-black border-t border-yellow-500/20 mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo et description */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base md:text-lg">Gala de l'Excellence</h3>
                <p className="text-yellow-400 text-xs md:text-sm">Africaine</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Célébrant l'innovation, l'excellence et le leadership à travers l'Afrique.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-white font-semibold text-base md:text-lg">Liens Rapides</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><a href="#accueil" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm">Accueil</a></li>
              <li><a href="#nomines" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm">Nominés</a></li>
              <li><a href="#categories" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm">Catégories</a></li>
              <li><a href="#panels" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm">Panels</a></li>
              <li><a href="#sponsors" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm">Sponsors</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-white font-semibold text-base md:text-lg">Contact</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-2 md:space-x-3">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-xs md:text-sm">Cotonou, Bénin</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <Mail className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-xs md:text-sm break-all">contact@gala-excellence.com</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <Phone className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-xs md:text-sm">+229 XX XX XX XX</span>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-white font-semibold text-base md:text-lg">Suivez-nous</h4>
            <div className="flex space-x-2 md:space-x-3">
              <Card className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border-yellow-500/30 flex items-center justify-center hover:bg-yellow-400/20 transition-colors cursor-pointer">
                <Facebook className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              </Card>
              <Card className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border-yellow-500/30 flex items-center justify-center hover:bg-yellow-400/20 transition-colors cursor-pointer">
                <Twitter className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              </Card>
              <Card className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border-yellow-500/30 flex items-center justify-center hover:bg-yellow-400/20 transition-colors cursor-pointer">
                <Instagram className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              </Card>
              <Card className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border-yellow-500/30 flex items-center justify-center hover:bg-yellow-400/20 transition-colors cursor-pointer">
                <Linkedin className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              </Card>
            </div>
            <p className="text-gray-400 text-xs">
              Restez informés des dernières actualités
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-yellow-500/20 mt-6 md:mt-8 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © 2025 Gala de l'Excellence Africaine. Tous droits réservés.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm text-center">Politique de confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm text-center">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
