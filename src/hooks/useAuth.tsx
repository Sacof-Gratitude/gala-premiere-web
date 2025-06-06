
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
      console.log('Tentative de récupération du rôle pour userId:', userId);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
        return null;
      }
      
      console.log('Profil récupéré:', profile);
      const role = profile?.role || null;
      console.log('Rôle extrait:', role);
      
      return role;
    } catch (error) {
      console.error('Exception lors de la récupération du rôle:', error);
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
    console.log('useAuth: Initialisation du hook d\'authentification');

    // Configurer l'écouteur d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log('Auth state change:', event, 'User email:', session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('Utilisateur connecté détecté, ID:', session.user.id);
          
          // Vérifier si on est sur une route qui nécessite le rôle
          if (checkIfProtectedRoute()) {
            console.log('Route protégée détectée, récupération du rôle...');
            setIsLoading(true); // S'assurer que le loading est activé
            
            try {
              const role = await fetchUserRole(session.user.id);
              console.log('Rôle récupéré dans onAuthStateChange:', role);
              
              if (isMounted) {
                setUserRole(role);
                setIsLoading(false);
                console.log('État mis à jour - userRole:', role, 'isLoading: false');
              }
            } catch (error) {
              console.error('Erreur lors de la récupération du rôle dans onAuthStateChange:', error);
              if (isMounted) {
                setUserRole(null);
                setIsLoading(false);
              }
            }
          } else {
            // Sur les routes publiques, arrêter le loading sans charger le rôle
            console.log('Route publique, pas de récupération de rôle nécessaire');
            setUserRole(null);
            if (isMounted) {
              setIsLoading(false);
            }
          }
        } else {
          console.log('Aucun utilisateur connecté');
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
        console.log('Vérification de la session existante...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erreur lors de la récupération de la session:', error);
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }

        console.log('Session existante trouvée:', session?.user?.email || 'aucune');
        
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('Session existante avec utilisateur, ID:', session.user.id);
          
          // Vérifier si on est sur une route qui nécessite le rôle
          if (checkIfProtectedRoute()) {
            console.log('Route protégée détectée pour session existante, récupération du rôle...');
            
            try {
              const role = await fetchUserRole(session.user.id);
              console.log('Rôle récupéré pour session existante:', role);
              
              if (isMounted) {
                setUserRole(role);
                setIsLoading(false);
                console.log('État mis à jour pour session existante - userRole:', role, 'isLoading: false');
              }
            } catch (error) {
              console.error('Erreur lors de la récupération du rôle pour session existante:', error);
              if (isMounted) {
                setUserRole(null);
                setIsLoading(false);
              }
            }
          } else {
            // Sur les routes publiques, arrêter le loading sans charger le rôle
            console.log('Route publique pour session existante, pas de récupération de rôle');
            setUserRole(null);
            if (isMounted) {
              setIsLoading(false);
            }
          }
        } else {
          // Pas d'utilisateur connecté, arrêter le loading
          console.log('Pas d\'utilisateur connecté, arrêt du loading');
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Exception lors de la vérification de session:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      console.log('useAuth: Nettoyage du hook');
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Effet pour récupérer le rôle quand on navigue vers une route protégée
  useEffect(() => {
    const handleRouteChange = async () => {
      console.log('useAuth: Vérification du changement de route');
      console.log('État actuel - user:', user?.email, 'userRole:', userRole, 'isLoading:', isLoading);
      
      // Si on a un utilisateur connecté et qu'on arrive sur une route protégée
      if (user && checkIfProtectedRoute() && userRole === null && !isLoading) {
        console.log('Navigation vers route protégée détectée, récupération du rôle...');
        setIsLoading(true);
        
        try {
          const role = await fetchUserRole(user.id);
          console.log('Rôle récupéré lors du changement de route:', role);
          setUserRole(role);
          setIsLoading(false);
          console.log('État mis à jour après changement de route - userRole:', role, 'isLoading: false');
        } catch (error) {
          console.error('Erreur lors de la récupération du rôle au changement de route:', error);
          setUserRole(null);
          setIsLoading(false);
        }
      }
    };

    handleRouteChange();
  }, [user, userRole, isLoading]);

  const signIn = async (email: string, password: string) => {
    console.log('Tentative de connexion pour:', email);
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Erreur de connexion:', error);
      setIsLoading(false);
    } else {
      console.log('Connexion réussie');
      // Le loading sera géré par onAuthStateChange
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Déconnexion en cours...');
    setIsLoading(true);
    await supabase.auth.signOut();
    // Le loading sera géré par onAuthStateChange
  };

  // Corriger la détection du rôle admin (casse insensible)
  const isAdmin = userRole?.toLowerCase() === 'admin';

  console.log('Auth state complet:', { 
    userEmail: user?.email, 
    userRole, 
    isAdmin, 
    isLoading,
    currentPath: window.location.pathname
  });

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
