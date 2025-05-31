
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
  photographer?: string;
  category?: string;
  order_number?: number;
}

interface GallerySectionProps {
  images: GalleryImage[];
  galaYear: number;
}

const GallerySection = ({ images, galaYear }: GallerySectionProps) => {
  const categoryColors = {
    ceremony: 'bg-yellow-500/20 text-yellow-400',
    networking: 'bg-blue-500/20 text-blue-400',
    panels: 'bg-green-500/20 text-green-400',
    awards: 'bg-purple-500/20 text-purple-400',
    sponsors: 'bg-orange-500/20 text-orange-400'
  };

  const categoryLabels = {
    ceremony: 'Cérémonie',
    networking: 'Networking',
    panels: 'Panels',
    awards: 'Remise des prix',
    sponsors: 'Sponsors'
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Aucune photo disponible pour le gala {galaYear}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images
        .sort((a, b) => (a.order_number || 0) - (b.order_number || 0))
        .map((image) => (
          <Card key={image.id} className="bg-slate-900/60 border-yellow-500/20 overflow-hidden group hover:border-yellow-500/40 transition-all duration-300">
            <div className="relative">
              <img 
                src={image.image_url} 
                alt={image.caption || 'Photo du gala'}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              {image.category && (
                <Badge className={`absolute top-2 right-2 ${categoryColors[image.category as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-400'}`}>
                  {categoryLabels[image.category as keyof typeof categoryLabels] || image.category}
                </Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              {image.caption && (
                <p className="text-white text-sm mb-2">{image.caption}</p>
              )}
              {image.photographer && (
                <p className="text-gray-400 text-xs">
                  📸 {image.photographer}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default GallerySection;
