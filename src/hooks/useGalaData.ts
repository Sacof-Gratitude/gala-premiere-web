
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useGalaData = (year?: number) => {
  return useQuery({
    queryKey: ['gala-data', year],
    queryFn: async () => {
      const galaQuery = supabase
        .from('galas')
        .select('*');
      
      if (year) {
        galaQuery.eq('year', year);
      } else {
        galaQuery.eq('is_active', true);
      }

      const { data: gala, error: galaError } = await galaQuery.single();
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

      const { data: panels, error: panelsError } = await supabase
        .from('panels')
        .select(`
          *,
          panel_speakers (*)
        `)
        .eq('gala_id', gala.id)
        .order('order_number');

      if (panelsError) throw panelsError;

      const { data: gallery, error: galleryError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gala_id', gala.id)
        .order('order_number');

      if (galleryError) throw galleryError;

      return {
        gala,
        categories,
        sponsors,
        panels,
        gallery
      };
    }
  });
};

export const useGalaYears = () => {
  return useQuery({
    queryKey: ['gala-years'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('galas')
        .select('year, title, status')
        .order('year', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
};
