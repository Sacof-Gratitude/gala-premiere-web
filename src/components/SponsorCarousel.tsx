
import React, { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';

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

  useEffect(() => {
    if (!showAll && sortedSponsors.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % sortedSponsors.length
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [sortedSponsors.length, showAll]);

  if (sortedSponsors.length === 0) {
    return null;
  }

  if (showAll) {
    // Affichage en grille pour la page sponsors
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedSponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    );
  }

  // Carrousel automatique pour la page d'accueil
  const getVisibleSponsors = () => {
    const visibleCount = Math.min(4, sortedSponsors.length);
    const visible = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % sortedSponsors.length;
      visible.push(sortedSponsors[index]);
    }
    
    return visible;
  };

  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ease-in-out">
        {getVisibleSponsors().map((sponsor, index) => (
          <div
            key={`${sponsor.id}-${currentIndex}-${index}`}
            className="transform transition-all duration-500 ease-in-out"
            style={{
              opacity: 1,
              transform: 'translateX(0)',
            }}
          >
            <SponsorCard sponsor={sponsor} />
          </div>
        ))}
      </div>
      
      {/* Indicateurs */}
      <div className="flex justify-center space-x-2 mt-8">
        {sortedSponsors.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-yellow-400 scale-110' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SponsorCarousel;
