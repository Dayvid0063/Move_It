import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface OnboardingStore {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
  checkOnboardingStatus: () => Promise<void>;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  hasCompletedOnboarding: false,
  completeOnboarding: async () => {
    await AsyncStorage.setItem('@onboarding_completed', 'true');
    set({ hasCompletedOnboarding: true });
  },
  checkOnboardingStatus: async () => {
    const status = await AsyncStorage.getItem('@onboarding_completed');
    set({ hasCompletedOnboarding: status === 'true' });
  },
}));

export const useOnboarding = () => {
  const { completeOnboarding, checkOnboardingStatus } = useOnboardingStore();

  return {
    completeOnboarding,
    checkOnboardingStatus,
  };
};
