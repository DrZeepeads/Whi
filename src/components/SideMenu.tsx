
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const SideMenu = ({ open, onClose }: SideMenuProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[260px] sm:w-[300px]" onCloseAutoFocus={e => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            Nelson-GPT
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col gap-2">
          <MenuItem icon={<User size={18} />} label="Profile" onClick={() => handleNavigation('/profile')} />
          <MenuItem icon={<Settings size={18} />} label="Settings" onClick={() => handleNavigation('/settings')} />
          <MenuItem icon={<HelpCircle size={18} />} label="Help" onClick={() => handleNavigation('/help')} />
          
          <div className="mt-auto pt-4 border-t">
            <MenuItem 
              icon={<LogOut size={18} />} 
              label="Sign Out" 
              onClick={() => console.log("Sign Out")} 
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "ghost";
  className?: string;
}

const MenuItem = ({ icon, label, onClick, variant = "default", className }: MenuItemProps) => {
  return (
    <Button 
      variant={variant} 
      className={`w-full justify-start ${className}`} 
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Button>
  );
};

export default SideMenu;
