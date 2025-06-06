
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

  const checkIfProtectedRoute = () => {
    const currentPath = window.location.pathname;
    const protectedRoutes = ['/admin'];
    return protectedRoutes.includes(currentPath);
  };

  useEffect(() => {
    let isMounted = true;

    // Configurer l'écouteur d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Vérifier si on est sur une route qui nécessite le rôle
          if (checkIfProtectedRoute()) {
            console.log('Route protégée détectée, récupération du rôle pour:', session.user.id);
            const role = await fetchUserRole(session.user.id);
            console.log('Rôle récupéré:', role);
            if (isMounted) {
              setUserRole(role);
              setIsLoading(false); // Important: arrêter le loading après récupération du rôle
            }
          } else {
            // Sur les routes publiques, ne pas charger le rôle mais arrêter le loading
            setUserRole(null);
            if (isMounted) {
              setIsLoading(false);
            }
          }
        } else {
          setUserRole(null);
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    );

    // Vérifier la session existante
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        console.log('Session existante:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Vérifier si on est sur une route qui nécessite le rôle
          if (checkIfProtectedRoute()) {
            console.log('Route protégée détectée, récupération du rôle pour session existante:', session.user.id);
            const role = await fetchUserRole(session.user.id);
            console.log('Rôle récupéré pour session existante:', role);
            if (isMounted) {
              setUserRole(role);
              setIsLoading(false); // Arrêter le loading après récupération
            }
          } else {
            // Sur les routes publiques, arrêter le loading sans charger le rôle
            if (isMounted) {
              setIsLoading(false);
            }
          }
        } else {
          // Pas d'utilisateur connecté, arrêter le loading
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        if (isMounted) {
          setIsLoading(false); // Arrêter le loading même en cas d'erreur
        }
      }
    };

    checkSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Effet supplémentaire pour récupérer le rôle quand on arrive sur une route protégée
  useEffect(() => {
    const handleRouteChange = async () => {
      // Si on a un utilisateur connecté et qu'on arrive sur une route protégée
      if (user && checkIfProtectedRoute() && userRole === null && !isLoading) {
        console.log('Navigation vers route protégée détectée, récupération du rôle');
        setIsLoading(true);
        const role = await fetchUserRole(user.id);
        console.log('Rôle récupéré lors du changement de route:', role);
        setUserRole(role);
        setIsLoading(false);
      }
    };

    handleRouteChange();
  }, [user, userRole, isLoading]);

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

  // Corriger la détection du rôle admin (casse insensible)
  const isAdmin = userRole?.toLowerCase() === 'admin';

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
