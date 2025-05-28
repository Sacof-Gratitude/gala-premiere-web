
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  title?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  title = "Temps restant avant l'événement" 
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
        setIsEventPassed(false);
      } else {
        setIsEventPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isEventPassed) {
    return (
      <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-green-400 mr-2" />
            <span className="text-xl font-semibold text-green-400">Événement en cours!</span>
          </div>
          <p className="text-gray-300">Le gala a commencé, profitez de cette soirée exceptionnelle!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <Clock className="h-6 w-6 text-yellow-400 mr-2" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => {
          const unitLabels = {
            days: 'Jours',
            hours: 'Heures',
            minutes: 'Minutes',
            seconds: 'Secondes'
          };

          return (
            <Card key={unit} className="bg-black/30 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-sm uppercase font-medium">
                  {unitLabels[unit as keyof typeof unitLabels]}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <p className="text-gray-300 mt-4 text-sm">
        Le gala commence le {new Date(targetDate).toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  );
};

export default CountdownTimer;
