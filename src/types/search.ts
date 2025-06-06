
export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
}

export interface AdminSearchBarProps {
  activeSection: string;
  data: any;
  onSelectItem: (item: any) => void;
  placeholder?: string;
}
