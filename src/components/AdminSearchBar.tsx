
import React, { useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminSearchBarProps } from '@/types/search';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import SearchSuggestions from '@/components/SearchSuggestions';

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({
  activeSection,
  data,
  onSelectItem,
  placeholder = "Rechercher..."
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    isOpen,
    setIsOpen,
    clearSearch,
    handleFocus
  } = useAdminSearch(activeSection, data);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const handleSelectSuggestion = (suggestion: any) => {
    setSearchTerm('');
    setIsOpen(false);
    onSelectItem(suggestion);
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
          onFocus={handleFocus}
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

      {isOpen && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  );
};

export default AdminSearchBar;
