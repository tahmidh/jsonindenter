import React, { useCallback } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { Eye, Trees } from 'lucide-react';
import { trackSettingChange } from '../utils/analytics';

/**
 * View mode toggle for switching between text and tree view
 */
export const ViewModeToggle: React.FC = () => {
    const { viewMode, setViewMode } = useEditorStore();
    const { isDarkMode } = useThemeStore();

    const handleToggle = useCallback(
        (mode: 'text' | 'tree') => {
            setViewMode(mode);
            trackSettingChange('View Mode', mode);
        },
        [setViewMode]
    );

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className={`text-xs sm:text-sm font-medium whitespace-nowrap ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>View:</label>
            <div className="flex gap-1 sm:gap-2">
                <button
                    onClick={() => handleToggle('text')}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 ${viewMode === 'text'
                        ? 'bg-brand-primary text-white font-bold'
                        : isDarkMode
                            ? 'bg-brand-panel-dark text-white hover:bg-brand-border-dark border border-brand-border-dark'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                >
                    <Eye size={14} />
                    <span className="hidden sm:inline">Text</span>
                </button>
                <button
                    onClick={() => handleToggle('tree')}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 ${viewMode === 'tree'
                        ? 'bg-brand-primary text-white font-bold'
                        : isDarkMode
                            ? 'bg-brand-panel-dark text-white hover:bg-brand-border-dark border border-brand-border-dark'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                >
                    <Trees size={14} />
                    <span className="hidden sm:inline">Tree</span>
                </button>
            </div>
        </div>
    );
};
