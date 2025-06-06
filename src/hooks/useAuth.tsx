
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

  const fetchUserRole = async (userId: string): Promise<string | null> => {
    try {
      console.log('🔄 Récupération du rôle pour userId:', userId);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('❌ Erreur lors de la récupération du rôle:', error);
        return null;
      }
      
      console.log('✅ Profil récupéré:', profile);
      const role = profile?.role || null;
      console.log('🎯 Rôle extrait:', role);
      
      return role;
    } catch (error) {
      console.error('💥 Exception lors de la récupération du rôle:', error);
      return null;
    }
  };

  const updateAuthState = async (session: Session | null) => {
    console.log('🔄 Mise à jour de l\'état d\'authentification');
    console.log('📧 Session user email:', session?.user?.email || 'aucun');
    
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.user) {
      console.log('👤 Utilisateur connecté détecté, ID:', session.user.id);
      
      try {
        const role = await fetchUserRole(session.user.id);
        console.log('🎭 Rôle récupéré:', role);
        setUserRole(role);
      } catch (error) {
        console.error('❌ Erreur lors de la récupération du rôle:', error);
        setUserRole(null);
      }
    } else {
      console.log('👤 Aucun utilisateur connecté');
      setUserRole(null);
    }
    
    setIsLoading(false);
    console.log('✅ État d\'authentification mis à jour - isLoading: false');
  };

  useEffect(() => {
    console.log('🚀 Initialisation du hook d\'authentification');

    // Vérifier la session existante immédiatement
    const initializeAuth = async () => {
      try {
        console.log('🔍 Vérification de la session existante...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erreur lors de la récupération de la session:', error);
          setIsLoading(false);
          return;
        }

        console.log('📋 Session existante:', session?.user?.email || 'aucune');
        await updateAuthState(session);
      } catch (error) {
        console.error('💥 Exception lors de l\'initialisation:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Configurer l'écouteur d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state change:', event);
        console.log('📧 User email:', session?.user?.email || 'aucun');
        
        await updateAuthState(session);
      }
    );

    return () => {
      console.log('🧹 Nettoyage du hook d\'authentification');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('🔑 Tentative de connexion pour:', email);
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('❌ Erreur de connexion:', error);
      setIsLoading(false);
    } else {
      console.log('✅ Connexion réussie');
      // Ne pas définir isLoading à false ici, cela sera fait dans updateAuthState
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('🚪 Déconnexion en cours...');
    setIsLoading(true);
    await supabase.auth.signOut();
    // L'état sera mis à jour via onAuthStateChange
  };

  // Détection du rôle admin (insensible à la casse)
  const isAdmin = userRole?.toLowerCase() === 'admin';

  console.log('📊 État d\'authentification complet:', { 
    userEmail: user?.email || 'undefined', 
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
