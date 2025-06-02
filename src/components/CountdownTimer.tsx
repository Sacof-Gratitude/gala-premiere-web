
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
      {timeUnits.map((unit, index) => (
        <Card key={index} className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border-yellow-500/30">
          <CardContent className="p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-yellow-400 mb-1">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide">
              {unit.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CountdownTimer;
