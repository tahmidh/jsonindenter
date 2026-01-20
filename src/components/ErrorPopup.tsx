import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';

export const ErrorPopup: React.FC = () => {
    const { error, errorLine, setError } = useEditorStore();
    const { isDarkMode } = useThemeStore();

    if (!error) return null;

    return (
        <div className="fixed bottom-12 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className={`flex items-start gap-4 p-4 rounded-xl border shadow-2xl max-w-sm lg:max-w-md ${isDarkMode
                    ? 'bg-[#1c2229] border-rose-500/30 text-rose-400 shadow-rose-900/20'
                    : 'bg-white border-rose-200 text-rose-600 shadow-rose-200/50'
                }`}>
                <div className={`p-2 rounded-lg shrink-0 ${isDarkMode ? 'bg-rose-500/10' : 'bg-rose-50'}`}>
                    <AlertCircle className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">JSON Validation Error</h4>
                    <p className={`text-xs leading-relaxed break-words ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {error} {errorLine && <span className="font-bold text-rose-500 underline ml-1">at line {errorLine}</span>}
                    </p>
                </div>

                <button
                    onClick={() => setError(null)}
                    className={`p-1 rounded-md transition-colors shrink-0 ${isDarkMode ? 'hover:bg-slate-800 text-slate-500' : 'hover:bg-slate-100 text-slate-400'
                        }`}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-rose-500/10 glow-rose-500/5"></div>
            </div>
        </div>
    );
};
