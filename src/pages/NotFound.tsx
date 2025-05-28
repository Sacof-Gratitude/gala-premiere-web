
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Trophy className="h-12 w-12 text-yellow-400" />
          <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Gala Immobilier
          </span>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Non Trouvée
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/20 mb-8">
          <p className="text-gray-400 text-sm">
            <span className="text-yellow-400 font-medium">URL demandée:</span> {location.pathname}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Button>
          </Link>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Page précédente
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-gray-400">
          <p className="mb-4">Vous cherchez quelque chose de spécifique?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Catégories de Prix
            </Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Nominés
            </Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Partenaires
            </Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Billetterie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
