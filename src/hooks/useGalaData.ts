
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useGalaData = () => {
  return useQuery({
    queryKey: ['gala-data'],
    queryFn: async () => {
      const { data: gala, error: galaError } = await supabase
        .from('galas')
        .select('*')
        .eq('is_active', true)
        .single();

      if (galaError) throw galaError;

      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          agencies (*)
        `)
        .eq('gala_id', gala.id)
        .order('order_number');

      if (categoriesError) throw categoriesError;

      const { data: sponsors, error: sponsorsError } = await supabase
        .from('sponsors')
        .select('*')
        .eq('gala_id', gala.id)
        .order('order_number');

      if (sponsorsError) throw sponsorsError;

      return {
        gala,
        categories,
        sponsors
      };
    }
  });
};
