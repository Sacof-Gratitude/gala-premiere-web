
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, User } from "lucide-react";

interface PanelSpeaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio?: string;
  image?: string;
  linkedin_url?: string;
  order_number: number;
}

interface Panel {
  id: string;
  title: string;
  description: string;
  theme: string;
  start_time?: string;
  end_time?: string;
  moderator_name: string;
  moderator_bio?: string;
  moderator_image?: string;
  order_number: number;
  panel_speakers: PanelSpeaker[];
}

interface PanelCardProps {
  panel: Panel;
}

const PanelCard = ({ panel }: PanelCardProps) => {
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return new Date(timeString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/60 to-black/80 border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                {panel.theme}
              </Badge>
              {panel.start_time && panel.end_time && (
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(panel.start_time)} - {formatTime(panel.end_time)}
                </div>
              )}
            </div>
            <CardTitle className="text-white text-lg mb-2">
              {panel.title}
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              {panel.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-yellow-400 font-medium text-sm mb-2 flex items-center">
            <User className="h-4 w-4 mr-1" />
            Modérateur
          </h4>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-white font-medium">{panel.moderator_name}</p>
            {panel.moderator_bio && (
              <p className="text-gray-400 text-xs mt-1">{panel.moderator_bio}</p>
            )}
          </div>
        </div>

        {panel.panel_speakers.length > 0 && (
          <div>
            <h4 className="text-yellow-400 font-medium text-sm mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Intervenants ({panel.panel_speakers.length})
            </h4>
            <div className="grid gap-2">
              {panel.panel_speakers
                .sort((a, b) => a.order_number - b.order_number)
                .map((speaker) => (
                  <div key={speaker.id} className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-white font-medium text-sm">{speaker.name}</p>
                    <p className="text-yellow-400 text-xs">{speaker.title}</p>
                    <p className="text-gray-400 text-xs">{speaker.company}</p>
                    {speaker.bio && (
                      <p className="text-gray-500 text-xs mt-1">{speaker.bio}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PanelCard;
