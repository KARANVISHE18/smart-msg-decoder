import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface MessageCardProps {
  message: string;
  sender: string;
  timestamp: string;
  classification: "safe" | "suspicious" | "spam";
  confidence: number;
}

const MessageCard = ({ message, sender, timestamp, classification, confidence }: MessageCardProps) => {
  const getClassificationIcon = () => {
    switch (classification) {
      case "safe":
        return <CheckCircle className="h-4 w-4" />;
      case "suspicious":
        return <AlertTriangle className="h-4 w-4" />;
      case "spam":
        return <Shield className="h-4 w-4" />;
    }
  };

  const getClassificationColor = () => {
    switch (classification) {
      case "safe":
        return "success";
      case "suspicious":
        return "warning";
      case "spam":
        return "destructive";
    }
  };

  return (
    <Card className="p-4 bg-gradient-card shadow-card border-0 animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{sender}</h3>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={getClassificationColor() as any}
            className="flex items-center gap-1 capitalize"
          >
            {getClassificationIcon()}
            {classification}
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-foreground mb-3 leading-relaxed">
        {message}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Confidence: {Math.round(confidence * 100)}%
        </div>
        <div className={`h-2 w-16 rounded-full overflow-hidden bg-muted`}>
          <div 
            className={`h-full transition-all duration-500 ${
              classification === 'safe' ? 'bg-success' : 
              classification === 'suspicious' ? 'bg-warning' : 'bg-destructive'
            }`}
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default MessageCard;