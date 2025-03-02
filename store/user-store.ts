import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Gender = "male" | "female" | "prefer-not-to-say";

interface UserState {
  // Authentication
  isAuthenticated: boolean;

  // Profile data
  gender?: Gender;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  goalWeight?: number; // in kg

  // Onboarding
  hasCompletedOnboarding: boolean;
}

type UserActions = {
  signIn: () => void;
  logout: () => void;
  setGender: (gender: Gender) => void;
  setAge: (age: number) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setGoalWeight: (weight: number) => void;
  completeOnboarding: () => void;
};

type UserStore = UserState & UserActions;

const STORAGE_KEY = "user-store";

const INITIAL_STATE: UserState = {
  isAuthenticated: false,
  gender: undefined,
  age: undefined,
  height: undefined,
  weight: undefined,
  goalWeight: undefined,
  hasCompletedOnboarding: false
};

// Partialize the store to only persist the necessary state
const partialize = ({
  isAuthenticated,
  gender,
  age,
  height,
  weight,
  goalWeight,
  hasCompletedOnboarding
}: UserStore) => ({
  isAuthenticated,
  gender,
  age,
  height,
  weight,
  goalWeight,
  hasCompletedOnboarding
});

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      // Auth Actions
      signIn: () => set({ isAuthenticated: true }),
      logout: () => set({ ...INITIAL_STATE }),

      // Profile Actions
      setGender: (gender) => set({ gender }),
      setAge: (age) => set({ age }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      setGoalWeight: (weight) => set({ goalWeight: weight }),

      // Onboarding Actions
      completeOnboarding: () => set({ hasCompletedOnboarding: true })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize
    }
  )
);
