import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BearState {
  bears: number;
}

type BearActions = {
  increase: (by: number) => void;
};

type BearStore = BearState & BearActions;

const STORAGE_KEY = "bear-storage";

// Partialize the store to only persist the necessary state
const partialize = ({ bears }: BearStore) => ({
  bears
});

export const useBearStore = create<BearStore>()(
  persist(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize
    }
  )
);
