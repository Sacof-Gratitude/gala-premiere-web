
import React, { useState } from 'react';
import { useGalaData } from '@/hooks/useGalaData';
import Navigation from '@/components/Navigation';
import CountdownTimer from '@/components/CountdownTimer';
import CategoryCard from '@/components/CategoryCard';
import AgencyCard from '@/components/AgencyCard';
import PanelCard from '@/components/PanelCard';
import GallerySection from '@/components/GallerySection';
import SponsorCard from '@/components/SponsorCard';
import SponsorshipSection from '@/components/SponsorshipSection';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Trophy, Sparkles, Clock, Users } from "lucide-react";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('accueil');
  
  const { data, isLoading, error } = useGalaData(selectedYear);

  console.log('Gala data:', data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Erreur de chargement</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400 text-xl">Aucune donnée disponible</div>
      </div>
    );
  }

  const { gala, categories, sponsors, panels, gallery } = data;
  
  const filteredAgencies = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.agencies || []
    : categories.flatMap(category => category.agencies || []);

  const eventDate = new Date(gala.event_date);
  const isCurrentYear = selectedYear === 2025;

  const renderContent = () => {
    switch (activeTab) {
      case 'accueil':
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-yellow-400 text-sm font-medium">
                  {isCurrentYear ? 'Événement à venir' : 'Événement terminé'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {gala.title}
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {gala.description}
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  {eventDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {gala.venue}
                </div>
              </div>
            </section>

            {/* Countdown Timer - Reduced size */}
            {isCurrentYear && (
              <section className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Compte à rebours
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Temps restant avant le grand événement
                  </p>
                </div>
                <CountdownTimer targetDate={gala.event_date} />
              </section>
            )}

            {/* Stats Section - Compact */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white mb-1">
                    {categories.length}
                  </div>
                  <div className="text-sm text-gray-400">Catégories</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white mb-1">
                    {filteredAgencies.length}
                  </div>
                  <div className="text-sm text-gray-400">Agences Nominées</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white mb-1">
                    {panels.length}
                  </div>
                  <div className="text-sm text-gray-400">Panels de Discussion</div>
                </CardContent>
              </Card>
            </section>

            {/* Categories Overview */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Catégories du Gala {selectedYear}
                </h2>
                <p className="text-gray-400">
                  Découvrez les différentes catégories et leurs nominés
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>

            {/* Sponsors Section */}
            {sponsors.length > 0 && (
              <section className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Nos Sponsors {selectedYear}
                  </h2>
                  <p className="text-gray-400">
                    Merci à nos partenaires qui rendent cet événement possible
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sponsors
                    .sort((a, b) => (a.order_number || 0) - (b.order_number || 0))
                    .map((sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    ))}
                </div>
              </section>
            )}
          </div>
        );

      case 'agencies':
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Agences Nominées {selectedYear}
                </h2>
                <p className="text-gray-400">
                  {filteredAgencies.length} agences en compétition
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  className={selectedCategory === null 
                    ? "bg-yellow-500 text-black" 
                    : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  }
                  onClick={() => setSelectedCategory(null)}
                >
                  Toutes
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={selectedCategory === category.id 
                      ? "bg-yellow-500 text-black" 
                      : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                    }
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Catégories du Gala {selectedYear}
              </h2>
              <p className="text-gray-400">
                Découvrez les différentes catégories de prix
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        );

      case 'panels':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Panels de Discussion {selectedYear}
              </h2>
              <p className="text-gray-400">
                Découvrez les thématiques et intervenants des panels
              </p>
            </div>
            
            {panels.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {panels
                  .sort((a, b) => a.order_number - b.order_number)
                  .map((panel) => (
                    <PanelCard key={panel.id} panel={panel} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Aucun panel disponible pour le gala {selectedYear}</p>
              </div>
            )}
          </div>
        );

      case 'galerie':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Galerie Photo {selectedYear}
              </h2>
              <p className="text-gray-400">
                Revivez les moments forts du gala
              </p>
            </div>
            
            <GallerySection images={gallery} galaYear={selectedYear} />
          </div>
        );

      case 'sponsors':
        return (
          <div className="space-y-12">
            {sponsors.length > 0 && (
              <section className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Nos Sponsors {selectedYear}
                  </h2>
                  <p className="text-gray-400">
                    Merci à nos partenaires qui rendent cet événement possible
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sponsors
                    .sort((a, b) => (a.order_number || 0) - (b.order_number || 0))
                    .map((sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    ))}
                </div>
              </section>
            )}
            
            <SponsorshipSection />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <Navigation 
        selectedYear={selectedYear} 
        onYearChange={setSelectedYear}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
