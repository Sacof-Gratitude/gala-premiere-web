
import React from 'react';
import { SearchSuggestion } from '@/types/search';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelectSuggestion: (suggestion: SearchSuggestion) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-64 overflow-y-auto">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="px-4 py-3 text-white hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          <div className="font-medium text-sm">{suggestion.title}</div>
          {suggestion.subtitle && (
            <div className="text-xs text-gray-400 mt-1">{suggestion.subtitle}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
