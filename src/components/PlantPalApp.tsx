import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { SageWelcome } from '@/components/mascot/SageWelcome';

export const PlantPalApp: React.FC = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [showWelcome, setShowWelcome] = React.useState(false);

  // Show welcome screen after successful registration/login if onboarding not completed
  React.useEffect(() => {
    if (isAuthenticated && user && !user.onboardingCompleted) {
      setShowWelcome(true);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  if (user && !user.onboardingCompleted) {
    if (showWelcome) {
      return (
        <SageWelcome
          userName={user.name}
          onContinue={() => setShowWelcome(false)}
        />
      );
    }
    return <OnboardingFlow />;
  }

  // Main app content
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
          <span className="text-4xl">🌱</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to PlantPal, {user?.name || 'Plant Lover'}!
        </h1>
        <p className="text-gray-600 mb-6">
          Level {user?.level} • {user?.xp} XP • {user?.streak} day streak
        </p>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <p className="text-gray-700">
            🎉 Your plant care journey begins here! The main dashboard and features are coming soon.
          </p>
        </div>
      </motion.div>
    </div>
  );
};