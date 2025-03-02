import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { supabase } from "~/services/supabase";

type Gender = "male" | "female" | "prefer-not-to-say";

type Profile = {
  gender?: Gender;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  goalWeight?: number; // in kg
};

interface AuthState {
  session?: Session | null;
  profile?: Profile | null;
  hasCompletedOnboarding?: boolean;
}

type AuthActions = {
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
  setProfile: (data: Profile) => void;
  completeOnboarding: () => void;
};

type AuthStore = AuthState & AuthActions;

const STORAGE_KEY = "auth-store";

const INITIAL_STATE: AuthState = {
  session: undefined,
  profile: undefined,
  hasCompletedOnboarding: false
};

// Partialize the store to only persist the necessary state
const partialize = ({
  session,
  profile,
  hasCompletedOnboarding
}: AuthStore) => ({
  session,
  profile,
  hasCompletedOnboarding
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setSession: (session) => set({ session }),

      signOut: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        set({ session: null });
      },

      setProfile: (data) =>
        set((prevState) => ({ profile: { ...prevState.profile, ...data } })),

      completeOnboarding: () => set({ hasCompletedOnboarding: true })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize
    }
  )
);
