
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
}

interface AdminSearchBarProps {
  activeSection: string;
  data: any;
  onSelectItem: (item: any) => void;
  placeholder?: string;
}

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({
  activeSection,
  data,
  onSelectItem,
  placeholder = "Rechercher..."
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        // Recherche globale
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

    return suggestions.slice(0, 8); // Limiter à 8 résultats
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setSearchTerm('');
    setIsOpen(false);
    onSelectItem(suggestion);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setSuggestions(getFilteredSuggestions(searchTerm.toLowerCase()))}
          className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-3 text-white hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="font-medium text-sm">{suggestion.title}</div>
              {suggestion.subtitle && (
                <div className="text-xs text-gray-400 mt-1">{suggestion.subtitle}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSearchBar;
