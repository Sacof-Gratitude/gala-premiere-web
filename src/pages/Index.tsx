
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Trophy, Star, ArrowRight, Clock, Award, Building2, HandHeart, Sparkles, Loader2 } from "lucide-react";
import { useGalaData } from "@/hooks/useGalaData";
import AgencyCard from "@/components/AgencyCard";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { data: galaData, isLoading, error } = useGalaData();

  // Countdown timer pour le gala
  useEffect(() => {
    if (!galaData?.gala?.event_date) return;
    
    const targetDate = new Date(galaData.gala.event_date).getTime();
    
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
  }, [galaData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Chargement du gala...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Erreur lors du chargement des données</p>
        </div>
      </div>
    );
  }

  const typeIcons = {
    'Meilleure Agence Immobilière': Building2,
    'Meilleure Entreprise BTP': HandHeart,
    'Meilleure AgenceTech Immobilier': Sparkles,
    'Innovation de l\'Année': Star,
    'Meilleur Cabinet de Conseil': Award
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-blue-400/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {galaData?.gala?.title || 'Gala Immobilier 2024'}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#categories" className="text-white hover:text-blue-400 transition-colors">Catégories</a>
              <a href="#agencies" className="text-white hover:text-blue-400 transition-colors">Agences</a>
              <a href="#sponsors" className="text-white hover:text-blue-400 transition-colors">Partenaires</a>
              <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold hover:from-blue-500 hover:to-blue-700">
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
            <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30 mb-4">
              {galaData?.gala && new Date(galaData.gala.event_date).toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })} • {galaData?.gala?.venue?.split(',')[0] || 'Palais des Congrès'}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {galaData?.gala?.title || 'Gala de l\'Immobilier'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {galaData?.gala?.description || 'Célébrons l\'excellence des agences qui façonnent l\'immobilier français'}
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20">
                <div className="text-3xl font-bold text-blue-400">{value}</div>
                <div className="text-gray-400 text-sm uppercase">{unit}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold hover:from-blue-500 hover:to-blue-700">
              <Trophy className="mr-2 h-5 w-5" />
              Réserver ma place
            </Button>
            <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <Users className="mr-2 h-5 w-5" />
              Voir les agences
            </Button>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-blue-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Date & Heure</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">
                  {galaData?.gala && new Date(galaData.gala.event_date).toLocaleDateString('fr-FR', { 
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-gray-300">
                  {galaData?.gala && new Date(galaData.gala.event_date).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} - 00h00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Lieu</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">{galaData?.gala?.venue || 'Palais des Congrès, Paris'}</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-400/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Participants</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300">{galaData?.gala?.max_participants || 500}+ professionnels</p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galaData?.categories?.map((category) => {
              const IconComponent = typeIcons[category.name as keyof typeof typeIcons] || Building2;
              const agencyCount = category.agencies?.length || 0;
              
              return (
                <Card key={category.id} className="bg-gradient-to-br from-black/40 to-black/60 border-blue-400/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mb-4">
                      <IconComponent className="h-12 w-12 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="bg-blue-400/20 text-blue-400">
                      {agencyCount} {agencyCount === 1 ? 'agence' : 'agences'}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Agencies */}
      <section id="agencies" className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Agences Nominées</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez les agences exceptionnelles en lice cette année dans toutes les catégories
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-black/40 mb-8">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Toutes</TabsTrigger>
              <TabsTrigger value="IMMOBILIER" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Immobilier</TabsTrigger>
              <TabsTrigger value="BTP" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">BTP</TabsTrigger>
              <TabsTrigger value="TECH" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Tech</TabsTrigger>
              <TabsTrigger value="CONSEIL" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Conseil</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galaData?.categories?.flatMap(category => 
                  category.agencies?.map(agency => (
                    <AgencyCard key={agency.id} agency={agency} />
                  ))
                )}
              </div>
            </TabsContent>

            {['IMMOBILIER', 'BTP', 'TECH', 'CONSEIL'].map(type => (
              <TabsContent key={type} value={type} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galaData?.categories?.flatMap(category => 
                    category.agencies?.filter(agency => agency.type === type)
                      .map(agency => (
                        <AgencyCard key={agency.id} agency={agency} />
                      ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
            <TabsList className="grid w-full grid-cols-5 bg-black/40">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Tous</TabsTrigger>
              <TabsTrigger value="PLATINUM" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Platine</TabsTrigger>
              <TabsTrigger value="GOLD" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Or</TabsTrigger>
              <TabsTrigger value="SILVER" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Argent</TabsTrigger>
              <TabsTrigger value="BRONZE" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">Bronze</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galaData?.sponsors?.map((sponsor) => (
                  <Card key={sponsor.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 aspect-square flex items-center justify-center group cursor-pointer">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors mb-2">
                        {sponsor.name}
                      </p>
                      <Badge variant="outline" className="border-blue-400 text-blue-400 text-xs">
                        {sponsor.level}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {['PLATINUM', 'GOLD', 'SILVER', 'BRONZE'].map(level => (
              <TabsContent key={level} value={level} className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galaData?.sponsors?.filter(sponsor => sponsor.level === level).map((sponsor) => (
                    <Card key={sponsor.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 aspect-square flex items-center justify-center group cursor-pointer">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <Building2 className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors mb-2">
                          {sponsor.name}
                        </p>
                        <Badge variant="outline" className="border-blue-400 text-blue-400 text-xs">
                          {sponsor.level}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-blue-400/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
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
                <li><a href="#categories" className="hover:text-blue-400 transition-colors">Catégories</a></li>
                <li><a href="#agencies" className="hover:text-blue-400 transition-colors">Agences</a></li>
                <li><a href="#sponsors" className="hover:text-blue-400 transition-colors">Partenaires</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Billetterie</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Informations</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {galaData?.gala && new Date(galaData.gala.event_date).toLocaleDateString('fr-FR')}
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {galaData?.gala && new Date(galaData.gala.event_date).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} - 00h00
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {galaData?.gala?.venue?.split(',')[0] || 'Palais des Congrès'}
                </li>
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
          
          <div className="border-t border-blue-400/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Gala de l'Immobilier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
