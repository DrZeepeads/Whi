
import { MessageType } from "@/components/ChatMessage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// Function to send a message and get a response from the Supabase Edge Function
export const sendMessage = async (message: string, sessionId = 'default'): Promise<MessageType> => {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('process-message', {
      body: { message, sessionId }
    });

    if (error) {
      console.error("Error calling process-message function:", error);
      throw new Error(error.message || "Failed to process message");
    }

    // Return the response from the edge function
    return data as MessageType;
  } catch (error) {
    console.error("Error sending message:", error);
    
    // Show error toast
    toast.error("Failed to get response. Please try again later.");
    
    // Return a fallback message
    return {
      id: Date.now().toString(),
      content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      sender: "bot",
      timestamp: new Date()
    };
  }
};
