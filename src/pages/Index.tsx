import { useState } from "react";
import { Capacitor } from "@capacitor/core";
import Header from "@/components/Header";
import MessageCard from "@/components/MessageCard";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Shield, MessageSquare, TrendingUp, AlertCircle, Smartphone, Play } from "lucide-react";
import heroPhone from "@/assets/hero-phone.png";

declare global {
  interface Window {
    SMS: {
      startWatch: (success: () => void, error: (error: any) => void) => void;
      stopWatch: (success: () => void, error: (error: any) => void) => void;
    };
  }
}

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [liveMessages, setLiveMessages] = useState<any[]>([]);

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

  const handleStartScan = async () => {
    if (!Capacitor.isNativePlatform()) {
      toast({
        title: "Native Platform Required",
        description: "SMS monitoring requires a native Android/iOS app. Try building the app with Capacitor.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    try {
      // Request SMS permissions
      await requestSMSPermissions();
      
      // Start SMS monitoring
      startSMSMonitoring();
      
      toast({
        title: "SMS Monitoring Started",
        description: "Now monitoring incoming messages for threats.",
      });
      
      setIsMonitoring(true);
      
    } catch (error) {
      console.error('SMS permission error:', error);
      toast({
        title: "Permission Denied",
        description: "SMS permissions are required for message monitoring.",
        variant: "destructive"
      });
    }
    
    setIsScanning(false);
  };

  const requestSMSPermissions = async () => {
    return new Promise((resolve, reject) => {
      if (window.SMS) {
        // SMS plugin is available
        resolve(true);
      } else {
        // Fallback for web testing
        if (confirm("Allow SMS Guardian to access your SMS messages?")) {
          resolve(true);
        } else {
          reject(new Error("Permission denied"));
        }
      }
    });
  };

  const startSMSMonitoring = () => {
    if (window.SMS) {
      window.SMS.startWatch(
        () => {
          console.log('SMS monitoring started successfully');
        },
        (error) => {
          console.error('SMS monitoring error:', error);
          toast({
            title: "Monitoring Error",
            description: "Failed to start SMS monitoring.",
            variant: "destructive"
          });
        }
      );

      // Listen for incoming SMS
      document.addEventListener('onSMSArrive', (e: any) => {
        const sms = e.data;
        handleIncomingSMS(sms);
      });
    } else {
      // Simulate incoming messages for web testing
      setTimeout(() => {
        simulateIncomingMessage();
      }, 2000);
    }
  };

  const handleIncomingSMS = (sms: any) => {
    // Analyze the message (mock AI analysis)
    const analysis = analyzeSMSMessage(sms.body);
    
    const newMessage = {
      id: Date.now(),
      message: sms.body,
      sender: sms.address,
      timestamp: "Just now",
      classification: analysis.classification,
      confidence: analysis.confidence
    };

    setLiveMessages(prev => [newMessage, ...prev.slice(0, 4)]);
    
    if (analysis.classification !== 'safe') {
      toast({
        title: `${analysis.classification.toUpperCase()} Message Detected`,
        description: `From: ${sms.address}`,
        variant: analysis.classification === 'spam' ? 'destructive' : 'default'
      });
    }
  };

  const analyzeSMSMessage = (message: string) => {
    // Simple mock analysis - replace with actual AI model
    const spamKeywords = ['winner', 'prize', 'click here', 'urgent', 'congratulations', '$', 'free'];
    const suspiciousKeywords = ['bank', 'account', 'verify', 'suspended', 'security'];
    
    const lowerMessage = message.toLowerCase();
    const spamScore = spamKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    const suspiciousScore = suspiciousKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    
    if (spamScore >= 2) {
      return { classification: 'spam' as const, confidence: Math.min(0.85 + spamScore * 0.05, 0.99) };
    } else if (suspiciousScore >= 1) {
      return { classification: 'suspicious' as const, confidence: Math.min(0.70 + suspiciousScore * 0.1, 0.95) };
    } else {
      return { classification: 'safe' as const, confidence: Math.random() * 0.2 + 0.8 };
    }
  };

  const simulateIncomingMessage = () => {
    const testMessages = [
      { body: "You've won a $500 gift card! Click here now!", address: "+1555123456" },
      { body: "Hey, are you free for dinner tonight?", address: "Mom" },
      { body: "URGENT: Your bank account will be suspended. Call now!", address: "SecurityBank" }
    ];
    
    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
    handleIncomingSMS(randomMessage);
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
              {isMonitoring ? 'Live Monitoring Active' : 'Monitoring Inactive'}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {/* Show live messages first if monitoring is active */}
            {liveMessages.length > 0 && (
              <>
                {liveMessages.map((message, index) => (
                  <div 
                    key={`live-${message.id}`} 
                    className="animate-slide-in border-l-4 border-primary pl-2"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <MessageCard {...message} />
                  </div>
                ))}
                {sampleMessages.length > 0 && <div className="border-t pt-3 mt-3" />}
              </>
            )}
            
            {/* Sample messages */}
            {sampleMessages.map((message, index) => (
              <div 
                key={message.id} 
                style={{ animationDelay: `${(liveMessages.length + index) * 150}ms` }}
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