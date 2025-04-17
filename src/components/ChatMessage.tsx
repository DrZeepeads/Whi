
import { motion } from "framer-motion";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  index: number;
}

const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  
  return (
    <motion.div
      className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <div className="message-content">{message.content}</div>
      <div className={`text-xs mt-1 ${isUser ? 'text-primary-foreground/70' : 'text-bot-message-foreground/70'}`}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
