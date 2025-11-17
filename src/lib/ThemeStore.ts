import { create } from 'zustand'

interface ThemeStoreState{
    theme: string,
    setTheme: (value: string) => void
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
    theme: 'light',
    setTheme: (value) => set({theme: value})
}))