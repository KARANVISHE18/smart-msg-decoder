import { useState } from "react";
import Header from "@/components/Header";
import MessageCard from "@/components/MessageCard";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, MessageSquare, TrendingUp, AlertCircle, Smartphone, Play } from "lucide-react";
import heroPhone from "@/assets/hero-phone.png";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);

  // Sample data
  const sampleMessages = [
    {
      id: 1,
      message: "Congratulations! You've won $1000! Click here to claim your prize now!",
      sender: "+1234567890",
      timestamp: "2 min ago",
      classification: "spam" as const,
      confidence: 0.95
    },
    {
      id: 2,
      message: "Hi! Are we still meeting for lunch today at 1 PM?",
      sender: "Alice Johnson",
      timestamp: "5 min ago",
      classification: "safe" as const,
      confidence: 0.98
    },
    {
      id: 3,
      message: "URGENT: Your bank account has been compromised. Call immediately.",
      sender: "SecureBank",
      timestamp: "15 min ago",
      classification: "suspicious" as const,
      confidence: 0.87
    }
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Hero Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-0 text-center animate-fade-in">
          <div className="flex flex-col items-center space-y-4">
            <img 
              src={heroPhone} 
              alt="SMS Guardian" 
              className="w-24 h-24 object-contain"
            />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Protect Your Messages
              </h2>
              <p className="text-muted-foreground mb-4">
                AI-powered detection keeps you safe from spam and malicious messages
              </p>
              <Button 
                variant="gradient" 
                size="lg" 
                onClick={handleStartScan}
                disabled={isScanning}
                className="min-w-[140px]"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start Scan
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Messages Scanned"
            value="1,247"
            icon={MessageSquare}
            trend="+12% this week"
            color="primary"
          />
          <StatsCard
            title="Threats Blocked"
            value="89"
            icon={Shield}
            trend="+23% this week"
            color="success"
          />
          <StatsCard
            title="Safety Score"
            value="94%"
            icon={TrendingUp}
            trend="Excellent"
            color="success"
          />
          <StatsCard
            title="Alerts"
            value="3"
            icon={AlertCircle}
            trend="Last 24h"
            color="warning"
          />
        </div>

        {/* Recent Messages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Analysis</h3>
            <Badge variant="outline" className="bg-background">
              <Smartphone className="h-3 w-3 mr-1" />
              Live Monitoring
            </Badge>
          </div>
          
          <div className="space-y-3">
            {sampleMessages.map((message, index) => (
              <div 
                key={message.id} 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <MessageCard {...message} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-glow border-0 text-center animate-slide-up">
          <h3 className="text-lg font-semibold mb-2">Ready for Full Protection?</h3>
          <p className="text-sm opacity-90 mb-4">
            Enable real-time SMS monitoring to protect against all threats
          </p>
          <Button variant="secondary" size="lg">
            Enable Monitoring
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Index;