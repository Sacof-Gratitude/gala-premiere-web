
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
  const { user, isAdmin, isLoading } = useAuth();
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

    // Seulement après chargement complet, vérifier le rôle admin
    if (requireAdmin && !isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive"
      });
      window.location.href = redirectTo;
      return;
    }
  }, [user, isAdmin, isLoading, requireAdmin, redirectTo, toast]);

  // Afficher le loading tant que les données ne sont pas chargées
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Vérification des autorisations...</div>
      </div>
    );
  }

  // Ne pas afficher le contenu si l'utilisateur n'est pas connecté ou pas admin (après chargement)
  if (!user || (requireAdmin && !isAdmin)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Redirection en cours...</div>
      </div>
    );
  }

  // Afficher le contenu seulement si tout est OK
  return <>{children}</>;
};

export default ProtectedRoute;
