import React, { useState } from 'react';
import { useGalaData } from '@/hooks/useGalaData';
import Navigation from '@/components/Navigation';
import CountdownTimer from '@/components/CountdownTimer';
import CategoryCard from '@/components/CategoryCard';
import SponsorCarousel from '@/components/SponsorCarousel';
import WinnersBanner from '@/components/WinnersBanner';
import Footer from '@/components/Footer';
import NomineeCard from '@/components/NomineeCard';
import PanelCard from '@/components/PanelCard';
import GallerySection from '@/components/GallerySection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Trophy } from "lucide-react";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeTab, setActiveTab] = useState('accueil');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, isLoading } = useGalaData(selectedYear);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedCategory(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedCategory(null);
  };

  const handleViewNominees = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab('nomines');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Chargement...</div>
      </div>
    );
  }

  const selectedCategoryData = selectedCategory 
    ? data?.categories.find(cat => cat.id === selectedCategory)
    : null;

  // Transformation des données des gagnants pour correspondre à l'interface Winner
  const winners = data?.categories.flatMap(cat => 
    cat.agencies?.filter(agency => agency.is_winner).map(agency => ({
      id: agency.id,
      name: agency.name,
      category: cat.name, // Ajout du nom de la catégorie
      type: agency.type,
      location: agency.location
    })) || []
  ) || [];

  const renderAccueil = () => (
    <div className="space-y-16">
      {/* Hero Section avec compte à rebours */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-500/30">
              <Trophy className="h-16 w-16 text-black" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-transparent mb-4">
              Gala de l'Excellence
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Africaine {selectedYear}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Célébrons ensemble les acteurs qui façonnent l'avenir de la communication en Afrique
            </p>
            <p className="text-lg text-yellow-400 font-semibold">
              📍 {data?.gala?.venue || 'Cotonou, Bénin'}
            </p>
          </div>
          
          <CountdownTimer targetDate={data?.gala?.event_date} />
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {data?.categories.length || 0}
              </div>
              <div className="text-gray-400">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {data?.categories.reduce((acc, cat) => acc + (cat.agencies?.length || 0), 0) || 0}
              </div>
              <div className="text-gray-400">Nominés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {data?.sponsors.length || 0}
              </div>
              <div className="text-gray-400">Sponsors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bannière des gagnants */}
      <WinnersBanner winners={winners} galaYear={selectedYear} />

      {/* Section sponsors avec carrousel automatique */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Nos Sponsors</h2>
            <p className="text-xl text-gray-400">
              Merci à nos partenaires qui soutiennent l'excellence africaine
            </p>
          </div>
          <SponsorCarousel sponsors={data?.sponsors || []} />
        </div>
      </section>
    </div>
  );

  const renderNomines = () => {
    if (selectedCategory && selectedCategoryData) {
      return (
        <div className="space-y-8 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black mb-6"
              onClick={handleBackToCategories}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux catégories
            </Button>

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                {selectedCategoryData.name}
              </h1>
              <p className="text-xl text-gray-400 mb-6 max-w-4xl mx-auto">
                {selectedCategoryData.description}
              </p>
              {selectedCategoryData.criteria && (
                <div className="bg-black/40 rounded-lg p-6 border border-yellow-500/20 max-w-4xl mx-auto">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Critères d'évaluation</h3>
                  <p className="text-gray-300">{selectedCategoryData.criteria}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategoryData.agencies?.map((nominee) => (
                <NomineeCard key={nominee.id} nominee={nominee} />
              ))}
            </div>

            {(!selectedCategoryData.agencies || selectedCategoryData.agencies.length === 0) && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Aucun nominé pour le moment
                </h3>
                <p className="text-gray-500">
                  Les nominés seront annoncés prochainement.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Nominés {selectedYear}</h1>
            <p className="text-xl text-gray-400">
              Découvrez les nominés par catégorie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onViewNominees={handleViewNominees}
              />
            ))}
          </div>

          {(!data?.categories || data.categories.length === 0) && (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Aucune catégorie disponible
              </h3>
              <p className="text-gray-500">
                Les catégories seront annoncées prochainement.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCategories = () => (
    <div className="space-y-8 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Catégories {selectedYear}</h1>
          <p className="text-xl text-gray-400">
            Explorez toutes les catégories de l'excellence africaine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              onViewNominees={handleViewNominees}
            />
          ))}
        </div>

        {(!data?.categories || data.categories.length === 0) && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Aucune catégorie disponible
            </h3>
            <p className="text-gray-500">
              Les catégories seront annoncées prochainement.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPanels = () => (
    <div className="space-y-8 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Panels & Conférences {selectedYear}</h1>
          <p className="text-xl text-gray-400">
            Découvrez les discussions et débats qui façonnent l'avenir
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data?.panels.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>

        {(!data?.panels || data.panels.length === 0) && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Aucun panel programmé
            </h3>
            <p className="text-gray-500">
              Le programme sera annoncé prochainement.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderGalerie = () => (
    <div className="space-y-8 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Galerie {selectedYear}</h1>
          <p className="text-xl text-gray-400">
            Revivez les moments forts de nos événements
          </p>
        </div>

        <GallerySection images={data?.gallery || []} galaYear={selectedYear} />
      </div>
    </div>
  );

  const renderSponsors = () => (
    <div className="space-y-8 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Nos Sponsors {selectedYear}</h1>
          <p className="text-xl text-gray-400">
            Découvrez nos partenaires qui soutiennent l'excellence africaine
          </p>
        </div>

        <SponsorCarousel sponsors={data?.sponsors || []} showAll={true} />

        {(!data?.sponsors || data.sponsors.length === 0) && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Aucun sponsor pour le moment
            </h3>
            <p className="text-gray-500">
              Nos partenaires seront annoncés prochainement.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'accueil':
        return renderAccueil();
      case 'nomines':
        return renderNomines();
      case 'categories':
        return renderCategories();
      case 'panels':
        return renderPanels();
      case 'galerie':
        return renderGalerie();
      case 'sponsors':
        return renderSponsors();
      default:
        return renderAccueil();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <Navigation 
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <main className="min-h-screen">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
