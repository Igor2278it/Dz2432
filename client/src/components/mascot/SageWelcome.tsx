import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface SageWelcomeProps {
  userName?: string;
  onContinue: () => void;
}

export const SageWelcome: React.FC<SageWelcomeProps> = ({ userName, onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Sage Character */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ 
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [-2, 2, -2],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <span className="text-6xl">🌿</span>
          </motion.div>
          
          {/* Floating sparkles */}
          <motion.div
            animate={{ 
              y: [-5, 5, -5],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [5, -5, 5],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-2 -left-2"
          >
            <Heart className="w-5 h-5 text-pink-400" />
          </motion.div>
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Hi {userName ? userName : 'there'}! I'm Sage 🌿
          </h1>
          
          <div className="space-y-3 text-gray-600">
            <p className="text-lg">
              Welcome to PlantPal! I'm your friendly plant care companion, 
              and I'm here to help you grow the most beautiful garden.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
            >
              <p className="text-sm">
                🎉 <strong>Welcome bonus:</strong> You've earned 100 XP to start your journey!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-2xl shadow-lg transition-all duration-200"
        >
          Let's start growing! 🌱
        </motion.button>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>💡 Did you know? Plants can improve your mood and air quality!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};