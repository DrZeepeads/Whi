
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
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

      <Card className="mx-auto w-full max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Help & Information</CardTitle>
          <CardDescription className="text-center">Frequently asked questions about Nelson-GPT</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Nelson-GPT?</AccordionTrigger>
              <AccordionContent>
                Nelson-GPT is a medical reference tool based on the Nelson Textbook of Pediatrics. It provides information and guidance on pediatric medicine topics through a conversational interface.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How accurate is the information?</AccordionTrigger>
              <AccordionContent>
                Nelson-GPT provides information based on the Nelson Textbook of Pediatrics, a respected medical reference. However, it should be used as a reference tool only and not as a substitute for professional medical advice, diagnosis, or treatment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use Nelson-GPT offline?</AccordionTrigger>
              <AccordionContent>
                Yes, Nelson-GPT has offline capabilities. Basic functionality and previously accessed content may be available without an internet connection, but new queries require connectivity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I install Nelson-GPT on my device?</AccordionTrigger>
              <AccordionContent>
                As a Progressive Web App, Nelson-GPT can be installed on your device. On most browsers, you'll see an "Add to Home Screen" or "Install" option in the address bar or menu. Follow the prompts to install it like a native app.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Nelson-GPT prioritizes user privacy. Your queries are processed to provide relevant information but are not stored permanently or shared with third parties for marketing purposes. For more details, please refer to our privacy policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
