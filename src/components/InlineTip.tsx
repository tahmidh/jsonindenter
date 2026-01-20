import { Lightbulb } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface InlineTipProps {
    tip: string;
}

export const InlineTip: React.FC<InlineTipProps> = ({ tip }) => {
    const { isDarkMode } = useThemeStore();

    return (
        <div
            className={`px-4 md:px-6 py-3 border-b ${isDarkMode
                    ? 'bg-brand-background-dark/50 border-brand-border-dark'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
        >
            <div className="flex items-start gap-3 text-sm">
                <Lightbulb
                    size={18}
                    className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                    <span className="font-semibold">Quick Tip:</span>{' '}
                    <span
                        className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}
                    >
                        {tip}
                    </span>
                </div>
            </div>
        </div>
    );
};
