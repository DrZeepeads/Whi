
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

interface ChatHeaderProps {
  onMenuToggle: () => void;
}

const ChatHeader = ({ onMenuToggle }: ChatHeaderProps) => {
  return (
    <header className="h-14 flex items-center px-4 border-b bg-primary/5">
      <Button variant="ghost" size="icon" onClick={onMenuToggle} className="mr-2">
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex items-center">
        <div className="mr-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-bold">N</span>
        </div>
        <h1 className="font-semibold text-lg">Nelson-GPT</h1>
      </div>
    </header>
  );
};

export default ChatHeader;
