
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage, { MessageType } from "@/components/ChatMessage";
import MessageInput from "@/components/MessageInput";
import SideMenu from "@/components/SideMenu";
import LoadingDots from "@/components/LoadingDots";
import SplashScreen from "@/components/SplashScreen";
import { sendMessage } from "@/services/api";

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: "Welcome to Nelson-GPT! How can I assist with your pediatric medicine questions?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content: text,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Send message to API and get response
      const botResponse = await sendMessage(text);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      <div className="flex flex-col h-full">
        <ChatHeader onMenuToggle={() => setSideMenuOpen(true)} />
        
        <SideMenu open={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />
        
        <main className="flex-1 overflow-y-auto p-4 bg-background/50">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} />
            ))}
            
            {isLoading && (
              <div className="message-bubble bot-message animate-fade-in">
                <LoadingDots />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>
        
        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </>
  );
};

export default Chat;
