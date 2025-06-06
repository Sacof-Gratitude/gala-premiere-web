import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    try {
      // Ajout d'un timeout pour éviter un blocage infini
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(
          new Error('Timeout fetchUserRole')), 800)
      );
      const fetchPromise = supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      const { data: profile, error } = await Promise.race([fetchPromise, timeoutPromise]);

      if (error) {
        console.error('❌ Erreur lors de la récupération du rôle:', error);
        return null;
      }

      const role = profile?.role || null;
      return role;
    } catch (error) {
      console.error('💥 Exception lors de la récupération du rôle:', error);
      return null;
    }
  };

  const updateAuthState = async (session: Session | null) => {
    setSession(session);
    setUser(session?.user ?? null);

    if (session?.user) {
      try {
        const role = await fetchUserRole(session.user.id);
        setUserRole(role);
      } catch {
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        await updateAuthState(session);
      }
    );

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!error && isMounted) {
          await updateAuthState(session);
        } else if (isMounted) {
          setIsLoading(false);
        }
      } catch {
        if (isMounted) setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Modification essentielle : setIsLoading(false) aussi en cas de succès
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoading(false);
      return { error };
    }
    setIsLoading(false);  // <-- Ajouté ici
    return { error: null };
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
  };

  const isAdmin = userRole?.toLowerCase() === 'admin';

  return (
    <AuthContext.Provider value={{ user, session, userRole, isAdmin, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
