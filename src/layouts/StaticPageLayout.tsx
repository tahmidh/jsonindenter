import React from 'react';
import { useThemeStore } from '../store/themeStore';

interface StaticPageLayoutProps {
    title: string;
    description?: string;
    lastUpdated?: string;
    centerTitle?: boolean;
    maxWidth?: string;
    children: React.ReactNode;
}

export const StaticPageLayout: React.FC<StaticPageLayoutProps> = ({
    title,
    description,
    lastUpdated,
    centerTitle = false,
    maxWidth = "max-w-5xl",
    children
}) => {
    const { isDarkMode } = useThemeStore();

    return (
        <div className={`flex flex-col flex-1 overflow-y-auto ${isDarkMode ? 'bg-brand-background-dark text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
            {/* Header */}
            <div className={`py-12 px-4 md:px-8 border-b ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                <div className={`${maxWidth} mx-auto space-y-4 ${centerTitle ? 'text-center' : ''}`}>
                    <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    )}
                    {lastUpdated && (
                        <div className="text-sm opacity-60 font-mono pt-2">
                            Last Updated: {lastUpdated}
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 py-12 px-6 md:px-12 lg:px-16">
                <div className={`${maxWidth} mx-auto prose ${isDarkMode ? 'prose-invert prose-headings:text-white prose-p:text-slate-300 prose-blockquote:text-slate-400 prose-blockquote:border-slate-400' : 'prose-slate prose-headings:text-slate-900 prose-blockquote:text-slate-700 prose-blockquote:border-slate-300'} max-w-none`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
