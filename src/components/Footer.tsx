import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, ExternalLink, Heart } from 'lucide-react';
import { trackNavigation, trackButtonClick } from '../utils/analytics';
import { ROUTES } from '../constants/routes';

export const Footer: React.FC = () => {
    const { isDarkMode } = useThemeStore();

    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: 'Tools',
            links: [
                { label: 'JSON Formatter', to: ROUTES.HOME },
                { label: 'JSON Validator', to: `/${ROUTES.VALIDATOR}` },
                { label: 'JSON Minifier', to: `/${ROUTES.MINIFIER}` },
                { label: 'JSON to CSV', to: `/${ROUTES.JSON_TO_CSV}` },
                { label: 'JSON to XML', to: `/${ROUTES.JSON_TO_XML}` },
                { label: 'JSON to Schema', to: `/${ROUTES.JSON_TO_SCHEMA}` },
                { label: 'JSON to YAML', to: `/${ROUTES.JSON_TO_YAML}` },
                { label: 'JSON to TOML', to: `/${ROUTES.JSON_TO_TOML}` },
                { label: 'JSON to TypeScript', to: `/${ROUTES.JSON_TO_TYPESCRIPT}` },
            ]
        },
        {
            title: 'Resources',
            links: [
                { label: 'Documentation', to: `/${ROUTES.DOCS}` },
                { label: 'API Reference', to: `/${ROUTES.API}` },
                { label: 'JSON Structure Guide', to: `/${ROUTES.JSON_GUIDE}` },
                { label: 'Developer Blog', to: `/${ROUTES.BLOG}` },
            ]
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', to: `/${ROUTES.PRIVACY}` },
                { label: 'Terms of Service', to: `/${ROUTES.TERMS}` },
                { label: 'Cookie Policy', to: `/${ROUTES.COOKIES}` },
                { label: 'Security', to: `/${ROUTES.SECURITY}` },
            ]
        }
    ];

    return (
        <footer className={`pt-16 pb-8 border-t ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark' : 'bg-slate-50 border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 2h-4v20h4V2zm-8 4h-2v12h2V6zm12 0h-2v12h2V6z" />
                                </svg>
                            </div>
                            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                JSON Indenter <span className="text-brand-primary">Pro</span>
                            </span>
                        </div>
                        <p className={`text-sm leading-relaxed max-w-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            The professional's choice for secure, client-side JSON formatting and validation.
                            Built for developers who value speed, privacy, and precision.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="#"
                                onClick={() => trackButtonClick('Github Click', 'Footer')}
                                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-500 hover:text-brand-primary border border-transparent hover:border-slate-200'}`}
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="#"
                                onClick={() => trackButtonClick('Twitter Click', 'Footer')}
                                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-500 hover:text-brand-primary border border-transparent hover:border-slate-200'}`}
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="mailto:support@jsonindenter.com"
                                onClick={() => trackButtonClick('Mail Click', 'Footer')}
                                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-500 hover:text-brand-primary border border-transparent hover:border-slate-200'}`}
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link: any) => (
                                    <li key={link.label}>
                                        {link.to ? (
                                            <Link
                                                to={link.to}
                                                onClick={() => trackNavigation(link.to, 'Footer')}
                                                className={`text-sm flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-brand-primary' : 'text-slate-500 hover:text-brand-primary'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                onClick={() => trackButtonClick(`Footer Link ${link.label}`, 'Footer')}
                                                className={`text-sm flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-brand-primary' : 'text-slate-500 hover:text-brand-primary'
                                                    }`}
                                            >
                                                {link.label}
                                                {link.label.includes('CSV') && <ExternalLink size={12} className="opacity-50" />}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className={isDarkMode ? 'border-slate-800' : 'border-slate-200'} />

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    {/* Left Side: Copyright & Credits */}
                    <div className={`flex flex-wrap items-center justify-center md:justify-start gap-1.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>© {currentYear} <Link to={ROUTES.HOME} onClick={() => trackNavigation(ROUTES.HOME, 'Footer')} className={`transition-colors ${isDarkMode ? 'hover:text-brand-primary' : 'hover:text-brand-primary'}`}>JSON Indenter Pro</Link>. All rights reserved.</span>
                        <span className="hidden md:inline text-slate-300 dark:text-slate-800">|</span>
                        <span className="flex items-center gap-1">
                            Developed with <Heart size={12} className="text-rose-500 fill-rose-500" /> from Canada
                        </span>
                    </div>

                    {/* Right Side: Status & Privacy */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                        <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            All Systems Operational
                        </span>
                        <div className={`hidden sm:block h-4 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                        <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            Privacy First Architecture
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
