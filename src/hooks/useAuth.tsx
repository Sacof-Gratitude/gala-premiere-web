
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      return profile?.role || null;
    } catch (error) {
      console.error('Erreur lors de la récupération du rôle:', error);
      return null;
    }
  };

  useEffect(() => {
    // Configurer l'écouteur d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Récupérer le rôle de l'utilisateur
          console.log('Récupération du rôle pour:', session.user.id);
          const role = await fetchUserRole(session.user.id);
          console.log('Rôle récupéré:', role);
          setUserRole(role);
          setIsLoading(false);
        } else {
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    // Vérifier la session existante
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session existante:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('Récupération du rôle pour session existante:', session.user.id);
          const role = await fetchUserRole(session.user.id);
          console.log('Rôle récupéré pour session existante:', role);
          setUserRole(role);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setIsLoading(false);
    }
    // Le loading sera géré par onAuthStateChange
    
    return { error };
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    // Le loading sera géré par onAuthStateChange
  };

  const isAdmin = userRole === 'ADMIN';

  console.log('Auth state:', { user: user?.email, userRole, isAdmin, isLoading });

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userRole,
      isAdmin,
      isLoading,
      signIn,
      signOut
    }}>
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
