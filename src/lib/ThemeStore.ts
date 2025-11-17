import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStoreState{
    theme: string,
    setTheme: (value: string) => void
}

export const useThemeStore = create<ThemeStoreState>(
    persist((set) => ({
        theme: 'light',
        setTheme: (value) => set({theme: value})
    }),
    {
        name: 'Theme-storage'
    }
    )

    
)