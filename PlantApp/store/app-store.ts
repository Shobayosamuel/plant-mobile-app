import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ScanResult } from '@/types/plant';
import { DEFAULT_LANGUAGE } from '@/constants/languages';

interface AppState {
  language: string;
  notificationsEnabled: boolean;
  offlineMode: boolean;
  scanHistory: ScanResult[];
  isFirstLaunch: boolean;

  // Actions
  setLanguage: (language: string) => void;
  toggleNotifications: () => void;
  toggleOfflineMode: () => void;
  addScanResult: (result: ScanResult) => void;
  deleteScanResult: (id: string) => void;
  clearScanHistory: () => void;
  setFirstLaunch: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      notificationsEnabled: true,
      offlineMode: false,
      scanHistory: [],
      isFirstLaunch: true,

      setLanguage: (language) => set({ language }),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      toggleOfflineMode: () => set((state) => ({ offlineMode: !state.offlineMode })),
      addScanResult: (result) => set((state) => ({
        scanHistory: [result, ...state.scanHistory]
      })),
      deleteScanResult: (id) => set((state) => ({
        scanHistory: state.scanHistory.filter(result => result.id !== id)
      })),
      clearScanHistory: () => set({ scanHistory: [] }),
      setFirstLaunch: (value) => set({ isFirstLaunch: value }),
    }),
    {
      name: 'plant-health-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);