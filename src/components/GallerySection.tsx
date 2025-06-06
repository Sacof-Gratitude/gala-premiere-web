
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, X, Camera, User } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
  category?: string;
  photographer?: string;
  order_number?: number;
}

interface GallerySectionProps {
  images: GalleryImage[];
  galaYear: number;
}

const GallerySection: React.FC<GallerySectionProps> = ({ images, galaYear }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Grouper les images par catégorie
  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))];
  
  // Filtrer les images
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          Aucune image disponible
        </h3>
        <p className="text-gray-500">
          Les photos de l'événement seront ajoutées prochainement.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtres par catégorie */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              className={
                filter === category
                  ? "bg-yellow-500 text-black"
                  : "border-gray-600 text-gray-300 hover:bg-yellow-500/20"
              }
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'Toutes' : category}
            </Button>
          ))}
        </div>
      )}

      {/* Grille d'images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <Card 
            key={image.id} 
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={image.image_url}
                  alt={image.caption || `Image de galerie ${galaYear}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Badge de catégorie */}
                {image.category && (
                  <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">
                    {image.category}
                  </Badge>
                )}
              </div>

              {/* Informations */}
              {(image.caption || image.photographer) && (
                <div className="p-3 space-y-1">
                  {image.caption && (
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {image.caption}
                    </p>
                  )}
                  {image.photographer && (
                    <div className="flex items-center text-gray-400 text-xs">
                      <User className="h-3 w-3 mr-1" />
                      {image.photographer}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de visualisation */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <img
              src={selectedImage.image_url}
              alt={selectedImage.caption || `Image de galerie ${galaYear}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Informations de l'image */}
            {(selectedImage.caption || selectedImage.photographer) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                {selectedImage.caption && (
                  <p className="text-white text-lg font-medium mb-2">
                    {selectedImage.caption}
                  </p>
                )}
                <div className="flex items-center justify-between text-gray-300 text-sm">
                  {selectedImage.photographer && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedImage.photographer}
                    </div>
                  )}
                  {selectedImage.category && (
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      {selectedImage.category}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {filteredImages.length === 0 && filter !== 'all' && (
        <div className="text-center py-8">
          <p className="text-gray-400">
            Aucune image trouvée pour la catégorie "{filter}"
          </p>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
