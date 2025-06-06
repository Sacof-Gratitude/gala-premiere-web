import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  redirectTo = '/',
}: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading, userRole } = useAuth();
  const { toast } = useToast();

  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (isLoading || redirected) return;

    if (!user) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page",
        variant: "destructive",
      });
      setRedirected(true);
      window.location.href = redirectTo;
      return;
    }

    if (requireAdmin && !isAdmin && userRole !== null) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive",
      });
      setRedirected(true);
      window.location.href = redirectTo;
      return;
    }
  }, [user, isAdmin, isLoading, userRole, requireAdmin, redirectTo, toast, redirected]);

  if (isLoading) {
    return <LoadingSpinner message="Vérification des autorisations..." size="lg" />;
  }

  if (!user) {
    // En théorie, on ne devrait pas arriver ici sans redirection, mais on garde un fallback
    return <LoadingSpinner message="Redirection en cours..." size="md" />;
  }

  if (requireAdmin) {
    if (userRole === null) {
      return <LoadingSpinner message="Vérification du rôle administrateur..." size="lg" />;
    }

    if (!isAdmin) {
      // En théorie, redirection déclenchée, on bloque l'affichage
      return <LoadingSpinner message="Redirection en cours..." size="md" />;
    }
  }

  // Tout est OK, on affiche les enfants
  return <>{children}</>;
};

export default ProtectedRoute;
