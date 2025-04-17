
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="mb-4">
        <Link to="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2" size={16} />
            Back to Chat
          </Button>
        </Link>
      </header>

      <Card className="mx-auto w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Settings</CardTitle>
          <CardDescription className="text-center">Customize your application preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Push Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive alerts about new information</p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications} 
              onCheckedChange={setNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <Switch 
              id="darkMode" 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dataSync">Offline Data Sync</Label>
              <p className="text-xs text-muted-foreground">Cache data for offline access</p>
            </div>
            <Switch 
              id="dataSync" 
              checked={dataSync} 
              onCheckedChange={setDataSync} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
