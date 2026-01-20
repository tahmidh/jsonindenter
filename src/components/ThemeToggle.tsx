import React, { useCallback } from 'react';
import { useThemeStore } from '../store/themeStore';
import { Moon, Sun } from 'lucide-react';
import { trackSettingChange } from '../utils/analytics';

/**
 * Theme toggle button for switching between light and dark modes
 */
export const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    const handleToggle = useCallback(() => {
        const newMode = isDarkMode ? 'light' : 'dark';
        toggleTheme();
        trackSettingChange('Theme', newMode);
    }, [toggleTheme, isDarkMode]);

    return (
        <button
            onClick={handleToggle}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${isDarkMode
                ? 'bg-brand-panel-dark text-amber-300 hover:bg-brand-border-dark border border-brand-border-dark'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
            <span className="hidden sm:inline text-sm">
                {isDarkMode ? 'Light' : 'Dark'}
            </span>
        </button>
    );
};
