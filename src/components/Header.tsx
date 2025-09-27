import { Button } from "@/components/ui/button";
import { Settings, Scan } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-primary text-primary-foreground">
      <div>
        <h1 className="text-xl font-bold">SMS Guardian</h1>
        <p className="text-sm opacity-90">AI-Powered Message Protection</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
          <Scan className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;