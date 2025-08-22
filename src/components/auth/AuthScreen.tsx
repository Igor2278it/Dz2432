import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('jsmith.mobbin1@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signInWithGoogle, signInWithApple } = useAuth();

  const handleEmailContinue = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For demo, we'll use a default password
      await signIn(email, 'password123');
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithApple();
    } catch (err: any) {
      setError(err.message || 'Apple sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f4f1e8 0%, #e8f5e8 50%, #f0f8f0 100%)'
    }}>
      {/* Decorative plant elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side plants */}
        <div className="absolute left-4 top-20">
          <svg width="80" height="120" viewBox="0 0 80 120" className="text-green-400 opacity-60">
            <path d="M10 100 Q20 80 30 60 Q35 50 40 40 Q45 30 50 20" stroke="currentColor" strokeWidth="3" fill="none"/>
            <ellipse cx="15" cy="85" rx="8" ry="15" fill="currentColor" transform="rotate(-20 15 85)"/>
            <ellipse cx="25" cy="70" rx="6" ry="12" fill="currentColor" transform="rotate(-10 25 70)"/>
            <ellipse cx="35" cy="55" rx="7" ry="14" fill="currentColor" transform="rotate(10 35 55)"/>
            <ellipse cx="45" cy="35" rx="5" ry="10" fill="currentColor" transform="rotate(20 45 35)"/>
          </svg>
        </div>

        <div className="absolute left-8 bottom-32">
          <svg width="60" height="80" viewBox="0 0 60 80" className="text-green-500 opacity-50">
            <path d="M30 70 Q25 50 20 30 Q18 20 15 10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <ellipse cx="35" cy="60" rx="6" ry="12" fill="currentColor" transform="rotate(15 35 60)"/>
            <ellipse cx="28" cy="45" rx="5" ry="10" fill="currentColor" transform="rotate(-5 28 45)"/>
            <ellipse cx="22" cy="25" rx="4" ry="8" fill="currentColor" transform="rotate(-15 22 25)"/>
          </svg>
        </div>

        {/* Right side plants */}
        <div className="absolute right-4 top-32">
          <svg width="70" height="100" viewBox="0 0 70 100" className="text-green-400 opacity-60">
            <path d="M60 90 Q50 70 40 50 Q35 40 30 30 Q25 20 20 10" stroke="currentColor" strokeWidth="3" fill="none"/>
            <ellipse cx="55" cy="75" rx="7" ry="13" fill="currentColor" transform="rotate(20 55 75)"/>
            <ellipse cx="45" cy="60" rx="6" ry="11" fill="currentColor" transform="rotate(10 45 60)"/>
            <ellipse cx="35" cy="45" rx="5" ry="9" fill="currentColor" transform="rotate(-10 35 45)"/>
            <ellipse cx="25" cy="25" rx="4" ry="7" fill="currentColor" transform="rotate(-20 25 25)"/>
          </svg>
        </div>

        <div className="absolute right-8 bottom-20">
          <svg width="50" height="70" viewBox="0 0 50 70" className="text-green-500 opacity-50">
            <path d="M25 60 Q30 40 35 20 Q37 15 40 5" stroke="currentColor" strokeWidth="2" fill="none"/>
            <ellipse cx="20" cy="50" rx="5" ry="10" fill="currentColor" transform="rotate(-15 20 50)"/>
            <ellipse cx="28" cy="35" rx="4" ry="8" fill="currentColor" transform="rotate(5 28 35)"/>
            <ellipse cx="33" cy="20" rx="3" ry="6" fill="currentColor" transform="rotate(15 33 20)"/>
          </svg>
        </div>

        {/* Small decorative flowers */}
        <div className="absolute right-16 top-1/3">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400 opacity-70">
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
            <ellipse cx="12" cy="6" rx="2" ry="4" fill="currentColor"/>
            <ellipse cx="18" cy="12" rx="4" ry="2" fill="currentColor"/>
            <ellipse cx="12" cy="18" rx="2" ry="4" fill="currentColor"/>
            <ellipse cx="6" cy="12" rx="4" ry="2" fill="currentColor"/>
          </svg>
        </div>

        <div className="absolute left-20 top-2/3">
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-yellow-400 opacity-60">
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
            <ellipse cx="10" cy="5" rx="1.5" ry="3" fill="currentColor"/>
            <ellipse cx="15" cy="10" rx="3" ry="1.5" fill="currentColor"/>
            <ellipse cx="10" cy="15" rx="1.5" ry="3" fill="currentColor"/>
            <ellipse cx="5" cy="10" rx="3" ry="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm mx-auto"
        >
          {/* Plant icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="inline-block">
              <svg width="48" height="48" viewBox="0 0 48 48" className="text-green-600">
                <path d="M24 40 Q20 35 16 25 Q14 20 12 15 Q10 10 8 5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <ellipse cx="28" cy="32" rx="8" ry="12" fill="currentColor" transform="rotate(20 28 32)"/>
                <ellipse cx="20" cy="28" rx="6" ry="10" fill="currentColor" transform="rotate(-10 20 28)"/>
              </svg>
            </div>
          </motion.div>

          {/* Welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl text-gray-600 mb-2">Welcome to</h1>
            <h2 className="text-5xl font-bold text-green-700 mb-4">PlantPal</h2>
            <p className="text-gray-600 text-lg">Log in or sign up to grow with us</p>
          </motion.div>

          {/* Email input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-6"
          >
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-4 pr-12 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-0"
                placeholder="Enter your email"
              />
              <button
                onClick={() => setEmail('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-6"
          >
            <Button
              onClick={handleEmailContinue}
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-2xl transition-all duration-200"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Continue'
              )}
            </Button>
          </motion.div>

          {/* Or divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mb-6"
          >
            <span className="text-gray-500 text-lg">or</span>
          </motion.div>

          {/* Social login buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="space-y-4"
          >
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full h-14 text-lg font-medium bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl flex items-center justify-center space-x-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </Button>

            <Button
              onClick={handleAppleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full h-14 text-lg font-medium bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl flex items-center justify-center space-x-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Continue with Apple</span>
            </Button>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Bottom plant pot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12"
        >
          <svg width="80" height="60" viewBox="0 0 80 60" className="text-orange-600">
            <path d="M15 35 L65 35 L60 55 L20 55 Z" fill="currentColor"/>
            <ellipse cx="40" cy="35" rx="25" ry="5" fill="currentColor" opacity="0.8"/>
            <path d="M40 35 Q35 25 30 15 Q28 10 25 5" stroke="#22c55e" strokeWidth="2" fill="none"/>
            <ellipse cx="45" cy="28" rx="6" ry="10" fill="#22c55e" transform="rotate(15 45 28)"/>
            <ellipse cx="35" cy="25" rx="5" ry="8" fill="#22c55e" transform="rotate(-10 35 25)"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};