
import { MessageType } from "@/components/ChatMessage";

// Simulated delay to mimic API call latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service for demonstration purposes
export const sendMessage = async (message: string): Promise<MessageType> => {
  // Simulate API call delay
  await delay(1000);
  
  // Simple response patterns based on keywords
  let response = "";
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
    response = "Hello! I'm Nelson-GPT, your pediatric medical assistant. How can I help you today?";
  }
  else if (lowercaseMessage.includes("fever") || lowercaseMessage.includes("temperature")) {
    response = "Fever is a common symptom in children. According to the Nelson Textbook of Pediatrics, a temperature above 100.4°F (38°C) is considered a fever. For infants under 3 months, any fever requires immediate medical attention.";
  }
  else if (lowercaseMessage.includes("vaccination") || lowercaseMessage.includes("vaccine") || lowercaseMessage.includes("immunization")) {
    response = "The recommended vaccination schedule for children includes vaccines for diseases such as measles, mumps, rubella, polio, diphtheria, tetanus, pertussis, and many others. The specific timing and combination of vaccines may vary by region.";
  }
  else if (lowercaseMessage.includes("cough") || lowercaseMessage.includes("cold")) {
    response = "Coughs and colds are common in children. Most are caused by viral infections and resolve within 7-10 days. Supportive care including rest, hydration, and symptom management is typically recommended. Antibiotics are not effective against viral infections.";
  }
  else if (lowercaseMessage.includes("rash")) {
    response = "Skin rashes in children can have many causes, from viral infections to allergic reactions. The Nelson Textbook of Pediatrics categorizes rashes based on appearance, distribution, and associated symptoms to aid in diagnosis.";
  }
  else if (lowercaseMessage.includes("ear") || lowercaseMessage.includes("infection")) {
    response = "Acute otitis media (middle ear infection) is common in children. Risk factors include age (6-24 months), bottle feeding, pacifier use, and exposure to tobacco smoke. Treatment may include pain management and in some cases, antibiotics.";
  }
  else {
    response = "Thank you for your query. Based on the Nelson Textbook of Pediatrics, I'd recommend consulting with a healthcare provider for specific medical advice tailored to your situation.";
  }
  
  return {
    id: Date.now().toString(),
    content: response,
    sender: "bot",
    timestamp: new Date()
  };
};
