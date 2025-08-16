import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Leaf, Target, Sprout, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const PLANT_TYPES = [
  { id: 'indoor', label: 'Indoor Plants', icon: '🪴' },
  { id: 'outdoor', label: 'Outdoor Plants', icon: '🌳' },
  { id: 'succulents', label: 'Succulents', icon: '🌵' },
  { id: 'flowers', label: 'Flowers', icon: '🌸' },
  { id: 'herbs', label: 'Herbs', icon: '🌿' },
  { id: 'vegetables', label: 'Vegetables', icon: '🥬' },
];

const GOALS = [
  { id: 'health', label: 'Keep plants healthy', icon: '💚', description: 'Learn to diagnose and treat plant issues' },
  { id: 'learning', label: 'Learn about plants', icon: '📚', description: 'Discover new species and care techniques' },
  { id: 'fun', label: 'Have fun gardening', icon: '🎉', description: 'Enjoy the therapeutic benefits of plant care' },
  { id: 'community', label: 'Connect with others', icon: '👥', description: 'Share experiences with fellow plant lovers' },
  { id: 'other', label: 'Something else', icon: '✨', description: 'Tell us your unique plant care goals' },
];

const EXPERIENCE_LEVELS = [
  { id: 'novice', label: 'Plant Novice', description: 'Just starting my plant journey', icon: '🌱' },
  { id: 'intermediate', label: 'Green Thumb', description: 'I have some plant experience', icon: '🌿' },
  { id: 'expert', label: 'Plant Expert', description: 'I\'m experienced with many plants', icon: '🌳' },
];

const CARE_FREQUENCIES = [
  { id: 'daily', label: 'Daily', description: 'I check on my plants every day', icon: '☀️' },
  { id: 'weekly', label: 'Weekly', description: 'I care for plants a few times a week', icon: '📅' },
  { id: 'monthly', label: 'Monthly', description: 'I prefer low-maintenance care', icon: '🗓️' },
];

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    mainGoal: '',
    plantTypes: [] as string[],
    experienceLevel: '',
    careFrequency: '',
    wantsReminders: true,
    customGoal: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { completeOnboarding } = useAuth();

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await completeOnboarding(formData);
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.mainGoal !== '';
      case 1: return formData.plantTypes.length > 0;
      case 2: return formData.experienceLevel !== '';
      case 3: return formData.careFrequency !== '';
      case 4: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <Target className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your main goal?</h2>
              <p className="text-gray-600">Help us personalize your PlantPal experience</p>
            </div>
            
            <div className="space-y-3">
              {GOALS.map((goal) => (
                <motion.button
                  key={goal.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, mainGoal: goal.id })}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.mainGoal === goal.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{goal.label}</div>
                      <div className="text-sm text-gray-600">{goal.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {formData.mainGoal === 'other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <textarea
                  placeholder="Tell us about your plant care goals..."
                  value={formData.customGoal}
                  onChange={(e) => setFormData({ ...formData, customGoal: e.target.value })}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-400 focus:outline-none resize-none"
                  rows={3}
                />
              </motion.div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <Sprout className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What plants do you have?</h2>
              <p className="text-gray-600">Select all that apply (you can add more later)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {PLANT_TYPES.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const newTypes = formData.plantTypes.includes(type.id)
                      ? formData.plantTypes.filter(t => t !== type.id)
                      : [...formData.plantTypes, type.id];
                    setFormData({ ...formData, plantTypes: newTypes });
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    formData.plantTypes.includes(type.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-3xl block mb-2">{type.icon}</span>
                    <div className="font-medium text-gray-800 text-sm">{type.label}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <Leaf className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your experience level?</h2>
              <p className="text-gray-600">This helps us provide the right guidance</p>
            </div>
            
            <div className="space-y-3">
              {EXPERIENCE_LEVELS.map((level) => (
                <motion.button
                  key={level.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, experienceLevel: level.id })}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.experienceLevel === level.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{level.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <Clock className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">How often do you care for plants?</h2>
              <p className="text-gray-600">We'll tailor reminders to your schedule</p>
            </div>
            
            <div className="space-y-3">
              {CARE_FREQUENCIES.map((freq) => (
                <motion.button
                  key={freq.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, careFrequency: freq.id })}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.careFrequency === freq.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{freq.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{freq.label}</div>
                      <div className="text-sm text-gray-600">{freq.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <Bell className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Care reminders</h2>
              <p className="text-gray-600">Would you like personalized care reminders?</p>
            </div>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, wantsReminders: true })}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  formData.wantsReminders
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔔</span>
                  <div>
                    <div className="font-medium text-gray-800">Yes, send me reminders</div>
                    <div className="text-sm text-gray-600">Get notifications for watering, fertilizing, and more</div>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, wantsReminders: false })}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  !formData.wantsReminders
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔕</span>
                  <div>
                    <div className="font-medium text-gray-800">No reminders needed</div>
                    <div className="text-sm text-gray-600">I'll manage my plant care schedule myself</div>
                  </div>
                </div>
              </motion.button>
            </div>

            <div className="bg-green-50 p-4 rounded-2xl">
              <h3 className="font-medium text-gray-800 mb-2">🎉 You're all set!</h3>
              <p className="text-sm text-gray-600">
                Based on your preferences, we'll personalize your PlantPal experience. 
                You'll earn 100 XP to start your journey!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed() || isLoading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span>Complete</span>
                      <Leaf className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};