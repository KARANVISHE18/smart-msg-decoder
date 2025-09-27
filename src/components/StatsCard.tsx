import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "primary" | "success" | "warning" | "destructive";
}

const StatsCard = ({ title, value, icon: Icon, trend, color = "primary" }: StatsCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "destructive":
        return "text-destructive bg-destructive/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Card className="p-4 bg-gradient-card shadow-soft border-0 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${getColorClasses()}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;