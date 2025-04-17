
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show the content after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Complete the splash screen after animation duration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-primary z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-24 h-24 mb-4 bg-white rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">N</span>
        </div>
        
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Nelson-GPT</h1>
            <p className="text-white/80">Medical Reference</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SplashScreen;
