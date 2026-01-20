import React, { useCallback } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { trackSettingChange } from '../utils/analytics';

/**
 * Indentation settings selector
 */
export const IndentationSettings: React.FC = () => {
    const { indentType, setIndentType } = useEditorStore();
    const { isDarkMode } = useThemeStore();

    const options: Array<{ value: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs'; label: string }> = [
        { value: 'spaces2', label: '2 Spaces' },
        { value: 'spaces3', label: '3 Spaces' },
        { value: 'spaces4', label: '4 Spaces' },
        { value: 'tabs', label: 'Tabs' },
    ];

    const handleChange = useCallback(
        (value: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs') => {
            setIndentType(value);
            trackSettingChange('Indentation', value);
        },
        [setIndentType]
    );

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className={`text-xs sm:text-sm font-medium whitespace-nowrap ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Indent:</label>
            <div className="flex gap-1 sm:gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleChange(option.value)}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${indentType === option.value
                            ? 'bg-brand-primary text-white font-bold'
                            : isDarkMode
                                ? 'bg-brand-panel-dark text-white hover:bg-brand-border-dark border border-brand-border-dark'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                    >
                        <span className="hidden sm:inline">{option.label}</span>
                        <span className="sm:hidden">
                            {option.value === 'spaces2' ? '2' : option.value === 'spaces3' ? '3' : option.value === 'spaces4' ? '4' : 'Tab'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};
