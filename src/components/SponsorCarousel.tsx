
import React, { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Sponsor {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  level: 'GOLD' | 'SILVER' | 'BRONZE' | 'PLATINUM';
  order_number?: number;
}

interface SponsorCarouselProps {
  sponsors: Sponsor[];
  showAll?: boolean;
}

const SponsorCarousel: React.FC<SponsorCarouselProps> = ({ sponsors, showAll = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Tri des sponsors par niveau et ordre
  const sortedSponsors = [...sponsors].sort((a, b) => {
    const levelOrder = { 'PLATINUM': 1, 'GOLD': 2, 'SILVER': 3, 'BRONZE': 4 };
    const aLevel = levelOrder[a.level] || 5;
    const bLevel = levelOrder[b.level] || 5;
    
    if (aLevel !== bLevel) {
      return aLevel - bLevel;
    }
    
    return (a.order_number || 999) - (b.order_number || 999);
  });

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-slide pour le carrousel
  useEffect(() => {
    if (!showAll && sortedSponsors.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, sortedSponsors.length - itemsPerView);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [sortedSponsors.length, showAll, itemsPerView]);

  if (sortedSponsors.length === 0) {
    return null;
  }

  if (showAll) {
    // Affichage en grille pour la page sponsors
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedSponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    );
  }

  const maxIndex = Math.max(0, sortedSponsors.length - itemsPerView);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      {sortedSponsors.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black -ml-4 ${
              !canGoPrev ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={goToPrevious}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black -mr-4 ${
              !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={goToNext}
            disabled={!canGoNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Carrousel container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(sortedSponsors.length / itemsPerView) * 100}%`
          }}
        >
          {sortedSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex-shrink-0"
              style={{ width: `${100 / sortedSponsors.length}%` }}
            >
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicateurs */}
      {sortedSponsors.length > itemsPerView && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 w-4' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SponsorCarousel;
