import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { PlantPalApp } from '@/components/PlantPalApp';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PlantPalApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;