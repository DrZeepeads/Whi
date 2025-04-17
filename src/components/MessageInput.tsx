
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-background p-3 border-t"
    >
      <Input
        placeholder="Ask about pediatric medicine..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        className="flex-grow shadow-sm"
        autoComplete="off"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || disabled}
        className="shrink-0"
      >
        <Send size={18} />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};

export default MessageInput;
