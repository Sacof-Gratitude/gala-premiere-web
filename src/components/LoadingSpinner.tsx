
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ message = "Chargement...", size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animé avec effet de pulsation et rotation */}
        <div className="relative">
          <div className={`${sizeClasses[size]} border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin`}></div>
          <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-yellow-500/40 rounded-full animate-pulse`}></div>
        </div>
        
        {/* Message avec animation de fade */}
        <div className={`${textSizeClasses[size]} text-yellow-400 font-medium animate-pulse`}>
          {message}
        </div>
        
        {/* Points animés */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
