import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { trackNavigation } from '../utils/analytics';
import type { WhatsNextLink } from '../config/pageEnhancements';

interface WhatsNextSectionProps {
    links: WhatsNextLink[];
    context: string;
}

export const WhatsNextSection: React.FC<WhatsNextSectionProps> = ({
    links,
    context,
}) => {
    const { isDarkMode } = useThemeStore();

    return (
        <div
            className={`mt-8 p-6 rounded-xl border ${isDarkMode
                ? 'bg-brand-background-dark/30 border-brand-border-dark'
                : 'bg-slate-50 border-slate-200'
                }`}
        >
            <h2 className="text-xl font-bold mb-4">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link, index) => {
                    const IconComponent =
                        LucideIcons[link.iconName as keyof typeof LucideIcons] ||
                        LucideIcons.ArrowRight;

                    return (
                        <Link
                            key={index}
                            to={link.href}
                            onClick={() => trackNavigation(context, link.href)}
                            className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${isDarkMode
                                ? 'bg-brand-background-dark border-brand-border-dark hover:border-brand-primary'
                                : 'bg-white border-slate-200 hover:border-brand-primary'
                                }`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                {/* @ts-expect-error - Dynamic icon component */}
                                <IconComponent
                                    size={20}
                                    className={
                                        isDarkMode ? 'text-brand-primary' : 'text-brand-primary'
                                    }
                                />
                            </div>
                            <div>
                                <h3
                                    className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'
                                        }`}
                                >
                                    {link.title}
                                </h3>
                                <p
                                    className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                        }`}
                                >
                                    {link.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
