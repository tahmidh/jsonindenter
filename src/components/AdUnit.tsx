import React from 'react';
import { useThemeStore } from '../store/themeStore';

interface AdUnitProps {
    slot: 'header' | 'footer' | 'sidebar';
    className?: string;
}

/**
 * AdUnit component with premium brand placeholder
 */
export const AdUnit: React.FC<AdUnitProps> = ({ slot, className = '' }) => {
    const { isDarkMode } = useThemeStore();

    // Different sizes based on slot
    const slotStyles = {
        header: 'h-10 md:h-12 px-4 min-w-[120px] md:min-w-[320px]',
        footer: 'w-full h-24 md:h-32 my-4',
        sidebar: 'w-full h-64'
    };

    return (
        <div className={`relative flex items-center justify-center rounded-lg border border-dashed transition-all duration-300 ${slotStyles[slot]
            } ${isDarkMode
                ? 'bg-brand-panel-dark/30 border-brand-border-dark hover:border-brand-primary/30'
                : 'bg-slate-50 border-slate-200 hover:border-brand-primary/30'
            } ${className}`}>
            <div className="flex flex-col items-center gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'
                    }`}>Advertisement</span>
                <span className={`text-[9px] ${isDarkMode ? 'text-slate-700' : 'text-slate-300'
                    }`}>Sponsored Slot</span>
            </div>

            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 p-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/20"></div>
            </div>
        </div>
    );
};
