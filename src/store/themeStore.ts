import { create } from 'zustand';

interface ThemeStore {
    isDarkMode: boolean;
    toggleTheme: () => void;
    setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
    // Initialize theme from localStorage or default to light
    const getSavedTheme = (): boolean => {
        const saved = localStorage.getItem('theme-mode');
        if (saved) {
            return saved === 'dark';
        }
        // Default to light mode
        return false;
    };

    return {
        isDarkMode: getSavedTheme(),
        toggleTheme: () => {
            set((state) => {
                const newMode = !state.isDarkMode;
                localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
                // Apply to document
                if (newMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                return { isDarkMode: newMode };
            });
        },
        setTheme: (isDark: boolean) => {
            localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            set({ isDarkMode: isDark });
        },
    };
});
