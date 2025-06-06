
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/' 
}: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading, userRole } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    console.log('🛡️ ProtectedRoute - État actuel:', {
      isLoading,
      userEmail: user?.email || 'undefined',
      userRole,
      isAdmin,
      requireAdmin
    });

    // Ne rien faire tant que les données sont en cours de chargement
    if (isLoading) {
      console.log('⏳ ProtectedRoute - Chargement en cours...');
      return;
    }
    
    // Vérifier l'authentification seulement après chargement complet
    if (!user) {
      console.log('🚫 ProtectedRoute - Utilisateur non connecté, redirection vers', redirectTo);
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page",
        variant: "destructive"
      });
      window.location.href = redirectTo;
      return;
    }

    // Si admin requis, vérifier le rôle
    if (requireAdmin && !isAdmin) {
      console.log('🚫 ProtectedRoute - Accès admin requis mais utilisateur pas admin. Rôle:', userRole);
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive"
      });
      window.location.href = redirectTo;
      return;
    }

    console.log('✅ ProtectedRoute - Accès autorisé');
  }, [user, isAdmin, isLoading, userRole, requireAdmin, redirectTo, toast]);

  // Afficher le loading tant que les données ne sont pas chargées
  if (isLoading) {
    return (
      <LoadingSpinner 
        message={requireAdmin ? "Vérification des droits d'administration..." : "Vérification des autorisations..."} 
        size="lg" 
      />
    );
  }

  // Ne pas afficher le contenu si l'utilisateur n'est pas connecté
  if (!user) {
    return <LoadingSpinner message="Redirection en cours..." size="md" />;
  }

  // Si admin requis mais pas admin, ne pas afficher le contenu
  if (requireAdmin && !isAdmin) {
    return <LoadingSpinner message="Redirection en cours..." size="md" />;
  }

  // Afficher le contenu seulement si tout est OK
  console.log('🎉 ProtectedRoute - Rendu du contenu autorisé');
  return <>{children}</>;
};

export default ProtectedRoute;
