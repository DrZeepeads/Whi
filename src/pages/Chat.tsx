
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage, { MessageType } from "@/components/ChatMessage";
import MessageInput from "@/components/MessageInput";
import SideMenu from "@/components/SideMenu";
import LoadingDots from "@/components/LoadingDots";
import SplashScreen from "@/components/SplashScreen";
import { sendMessage } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { v4 as uuidv4 } from "uuid";
import type { Tables } from "@/integrations/supabase/types";

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or retrieve session
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
      loadChatHistory(storedSessionId);
    } else {
      // Create a new session
      const newSessionId = uuidv4();
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
      
      // Add welcome message for new sessions
      setMessages([
        {
          id: "welcome",
          content: "Welcome to Nelson-GPT! How can I assist with your pediatric medicine questions?",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Load chat history from Supabase
  const loadChatHistory = async (sid: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sid)
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error("Error fetching chat history:", error);
        toast.error("Failed to load chat history");
        
        // Add welcome message as fallback
        setMessages([
          {
            id: "welcome",
            content: "Welcome back to Nelson-GPT! How can I assist with your pediatric medicine questions?",
            sender: "bot",
            timestamp: new Date()
          }
        ]);
      } else if (data && data.length > 0) {
        // Convert the data to MessageType format
        const formattedMessages: MessageType[] = data.map((msg: Tables<'chat_messages'>) => ({
          id: msg.id,
          content: msg.content,
          sender: msg.role === 'user' ? 'user' : 'bot',
          timestamp: new Date(msg.created_at || Date.now())
        }));
        
        setMessages(formattedMessages);
      } else {
        // No history, add welcome message
        setMessages([
          {
            id: "welcome",
            content: "Welcome to Nelson-GPT! How can I assist with your pediatric medicine questions?",
            sender: "bot",
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
