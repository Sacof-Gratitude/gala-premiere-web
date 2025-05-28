
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Trophy, Star, ArrowRight, Clock, Award, Building2, HandHeart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer pour le gala (exemple: 15 juin 2024)
  useEffect(() => {
    const targetDate = new Date('2024-06-15T19:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      id: 1,
      title: "Meilleur Projet Résidentiel",
      description: "Excellence en développement résidentiel innovant",
      icon: Building2,
      nominees: 8
    },
    {
      id: 2,
      title: "Innovation Technologique",
      description: "Technologies révolutionnaires dans l'immobilier",
      icon: Sparkles,
      nominees: 6
    },
    {
      id: 3,
      title: "Développement Durable",
      description: "Projets éco-responsables et durables",
      icon: HandHeart,
      nominees: 7
    },
    {
      id: 4,
      title: "Meilleur Agent de l'Année",
      description: "Excellence en service client et ventes",
      icon: Award,
      nominees: 12
    }
  ];

  const sponsors = [
    { name: "Immobilier Plus", tier: "Platine" },
    { name: "Constructia", tier: "Or" },
    { name: "PropTech Solutions", tier: "Or" },
    { name: "Green Building Co", tier: "Argent" },
    { name: "Urban Development", tier: "Argent" },
    { name: "Smart Homes", tier: "Bronze" }
  ];

  const featuredNominees = [
    {
      id: 1,
      name: "Résidence Aurora",
      company: "Développements Prestige",
      category: "Projet Résidentiel",
      image: "/placeholder.svg",
      description: "Un complexe résidentiel de luxe avec vue panoramique"
    },
    {
      id: 2,
      name: "EcoTech Tower",
      company: "GreenBuild Corp",
      category: "Innovation",
      image: "/placeholder.svg",
      description: "Tour intelligente avec certification LEED Platine"
    },
    {
      id: 3,
      name: "Sarah Dubois",
      company: "Immobilier Elite",
      category: "Agent de l'Année",
      image: "/placeholder.svg",
      description: "Plus de 50 transactions réussies en 2023"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Gala Immobilier 2024
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#categories" className="text-white hover:text-yellow-400 transition-colors">Catégories</a>
              <a href="#nominees" className="text-white hover:text-yellow-400 transition-colors">Nominés</a>
              <a href="#sponsors" className="text-white hover:text-yellow-400 transition-colors">Partenaires</a>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700">
                Acheter des billets
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 mb-4">
              15 Juin 2024 • Palais des Congrès
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Gala de l'Immobilier
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Célébrons ensemble l'excellence et l'innovation dans le secteur immobilier français
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/20">
                <div className="text-3xl font-bold text-yellow-400">{value}</div>
                <div className="text-gray-400 text-sm uppercase">{unit}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700">
              <Trophy className="mr-2 h-5 w-5" />
              Réserver ma place
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
              <Users className="mr-2 h-5 w-5" />
              Voir les nominés
            </Button>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-yellow-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <CardTitle className="text-white">Date & Heure</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">Samedi 15 Juin 2024</p>
                <p className="text-gray-300">19h00 - 00h00</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-yellow-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <CardTitle className="text-white">Lieu</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">Palais des Congrès</p>
                <p className="text-gray-300">2 Place de la Porte Maillot, Paris</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-yellow-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <CardTitle className="text-white">Participants</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">500+ professionnels</p>
                <p className="text-gray-300">Leaders de l'immobilier</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Catégories de Prix</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez les différentes catégories qui récompensent l'excellence dans tous les domaines de l'immobilier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mb-4">
                    <category.icon className="h-12 w-12 text-yellow-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-white group-hover:text-yellow-400 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
                    {category.nominees} nominés
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Nominees */}
      <section id="nominees" className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Nominés en Vedette</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez quelques-uns des projets et professionnels exceptionnels en lice cette année
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredNominees.map((nominee) => (
              <Card key={nominee.id} className="bg-gradient-to-br from-black/40 to-black/60 border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={nominee.image} 
                    alt={nominee.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-black">
                    {nominee.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-white group-hover:text-yellow-400 transition-colors">
                    {nominee.name}
                  </CardTitle>
                  <CardDescription className="text-yellow-400 font-medium">
                    {nominee.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{nominee.description}</p>
                  <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                    Voir le profil
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
              Voir tous les nominés
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Nos Partenaires</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Merci à nos partenaires qui rendent ce gala possible
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/40">
              <TabsTrigger value="all" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Tous</TabsTrigger>
              <TabsTrigger value="platine" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Platine</TabsTrigger>
              <TabsTrigger value="or" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Or</TabsTrigger>
              <TabsTrigger value="argent" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Argent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {sponsors.map((sponsor, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 aspect-square flex items-center justify-center group cursor-pointer">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-black" />
                      </div>
                      <p className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors">
                        {sponsor.name}
                      </p>
                      <Badge variant="outline" className="mt-1 border-yellow-400 text-yellow-400">
                        {sponsor.tier}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-yellow-400/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Gala Immobilier
                </span>
              </div>
              <p className="text-gray-400">
                L'événement de référence pour célébrer l'excellence dans l'immobilier français.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#categories" className="hover:text-yellow-400 transition-colors">Catégories</a></li>
                <li><a href="#nominees" className="hover:text-yellow-400 transition-colors">Nominés</a></li>
                <li><a href="#sponsors" className="hover:text-yellow-400 transition-colors">Partenaires</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Billetterie</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Informations</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><Calendar className="h-4 w-4 mr-2" />15 Juin 2024</li>
                <li className="flex items-center"><Clock className="h-4 w-4 mr-2" />19h00 - 00h00</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" />Palais des Congrès</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@gala-immobilier.fr</li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-yellow-400/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Gala de l'Immobilier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
