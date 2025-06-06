
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

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
    // Ne rien faire tant que les données sont en cours de chargement
    if (isLoading) return;
    
    // Seulement après chargement complet, vérifier l'authentification
    if (!user) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page",
        variant: "destructive"
      });
      window.location.href = redirectTo;
      return;
    }

    // Si admin requis mais utilisateur pas admin ET qu'on a récupéré le rôle
    if (requireAdmin && !isAdmin && userRole !== null) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive"
      });
      window.location.href = redirectTo;
      return;
    }
  }, [user, isAdmin, isLoading, userRole, requireAdmin, redirectTo, toast]);

  // Afficher le loading tant que les données ne sont pas chargées
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Vérification des autorisations...</div>
      </div>
    );
  }

  // Ne pas afficher le contenu si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Redirection en cours...</div>
      </div>
    );
  }

  // Si admin requis, vérifier le rôle
  if (requireAdmin) {
    // Si le rôle n'est pas encore récupéré, afficher le loading
    if (userRole === null) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
          <div className="text-yellow-400 text-xl">Vérification du rôle administrateur...</div>
        </div>
      );
    }
    
    // Si pas admin, ne pas afficher le contenu
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
          <div className="text-red-400 text-xl">Redirection en cours...</div>
        </div>
      );
    }
  }

  // Afficher le contenu seulement si tout est OK
  return <>{children}</>;
};

export default ProtectedRoute;
