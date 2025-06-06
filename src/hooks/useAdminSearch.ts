
import { useState, useEffect } from 'react';
import { SearchSuggestion } from '@/types/search';

export const useAdminSearch = (activeSection: string, data: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getFilteredSuggestions = (term: string): SearchSuggestion[] => {
    if (!data) return [];

    const suggestions: SearchSuggestion[] = [];

    switch (activeSection) {
      case 'galas':
        if (data.gala) {
          if (data.gala.title.toLowerCase().includes(term) || 
              data.gala.description?.toLowerCase().includes(term) ||
              data.gala.venue?.toLowerCase().includes(term)) {
            suggestions.push({
              id: data.gala.id,
              title: data.gala.title,
              subtitle: `${data.gala.year} - ${data.gala.venue}`,
              type: 'gala'
            });
          }
        }
        break;

      case 'categories':
        data.categories?.forEach((category: any) => {
          if (category.name.toLowerCase().includes(term) || 
              category.description?.toLowerCase().includes(term)) {
            suggestions.push({
              id: category.id,
              title: category.name,
              subtitle: category.description,
              type: 'category'
            });
          }
        });
        break;

      case 'nominees':
        data.categories?.forEach((category: any) => {
          category.agencies?.forEach((agency: any) => {
            if (agency.name.toLowerCase().includes(term) ||
                agency.type?.toLowerCase().includes(term) ||
                agency.location?.toLowerCase().includes(term)) {
              suggestions.push({
                id: agency.id,
                title: agency.name,
                subtitle: `${agency.type} - ${agency.location}`,
                type: 'nominee'
              });
            }
          });
        });
        break;

      case 'panels':
        data.panels?.forEach((panel: any) => {
          if (panel.title.toLowerCase().includes(term) ||
              panel.theme?.toLowerCase().includes(term) ||
              panel.moderator_name?.toLowerCase().includes(term)) {
            suggestions.push({
              id: panel.id,
              title: panel.title,
              subtitle: `${panel.theme} - ${panel.moderator_name}`,
              type: 'panel'
            });
          }
        });
        break;

      case 'sponsors':
        data.sponsors?.forEach((sponsor: any) => {
          if (sponsor.name.toLowerCase().includes(term) ||
              sponsor.level?.toLowerCase().includes(term)) {
            suggestions.push({
              id: sponsor.id,
              title: sponsor.name,
              subtitle: `Niveau ${sponsor.level}`,
              type: 'sponsor'
            });
          }
        });
        break;

      case 'gallery':
        data.gallery?.forEach((image: any) => {
          if (image.caption?.toLowerCase().includes(term) ||
              image.category?.toLowerCase().includes(term) ||
              image.photographer?.toLowerCase().includes(term)) {
            suggestions.push({
              id: image.id,
              title: image.caption || 'Image sans titre',
              subtitle: `${image.category || 'Sans catégorie'} - ${image.photographer || 'Photographe inconnu'}`,
              type: 'gallery'
            });
          }
        });
        break;

      default:
        if (data.categories) {
          data.categories.forEach((category: any) => {
            if (category.name.toLowerCase().includes(term)) {
              suggestions.push({
                id: category.id,
                title: category.name,
                subtitle: 'Catégorie',
                type: 'category'
              });
            }
          });
        }
        break;
    }

    return suggestions.slice(0, 8);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filteredSuggestions = getFilteredSuggestions(searchTerm.toLowerCase());
    setSuggestions(filteredSuggestions);
    setIsOpen(filteredSuggestions.length > 0);
  }, [searchTerm, activeSection, data]);

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (searchTerm) {
      setSuggestions(getFilteredSuggestions(searchTerm.toLowerCase()));
      setIsOpen(true);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    isOpen,
    setIsOpen,
    clearSearch,
    handleFocus
  };
};
