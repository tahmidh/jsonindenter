import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { trackNavigation } from '../utils/analytics';
import type { Breadcrumb } from '../config/pageEnhancements';

interface BreadcrumbsProps {
    items: Breadcrumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const { isDarkMode } = useThemeStore();

    return (
        <nav
            className={`flex items-center gap-2 text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
            aria-label="Breadcrumb"
        >
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <ChevronRight
                            size={14}
                            className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}
                        />
                    )}
                    {index === items.length - 1 ? (
                        <span className="font-medium">{item.name}</span>
                    ) : (
                        <Link
                            to={item.url}
                            onClick={() => trackNavigation('breadcrumb-nav', item.url)}
                            className={`transition-colors hover:text-brand-primary ${isDarkMode ? 'hover:text-brand-primary' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
};
