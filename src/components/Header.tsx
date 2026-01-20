import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { ThemeToggle } from './ThemeToggle';
import { ROUTES } from '../constants/routes';
// import { AdUnit } from './AdUnit';
import {
    Layout,
    Zap,
    FileSpreadsheet,
    Terminal,
    SearchCode,
    Menu,
    X,
    Braces,
    FileText,
    FileCode,
    FileJson
} from 'lucide-react';
import { trackNavigation, trackButtonClick } from '../utils/analytics';

export const Header: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Indenter', path: ROUTES.HOME, icon: <Layout size={18} /> },
        { name: 'Validator', path: `/${ROUTES.VALIDATOR}`, icon: <SearchCode size={18} /> },
        { name: 'Minifier', path: `/${ROUTES.MINIFIER}`, icon: <Zap size={18} /> },
        { name: 'CSV Converter', path: `/${ROUTES.JSON_TO_CSV}`, icon: <FileSpreadsheet size={18} /> },
        { name: 'XML Converter', path: `/${ROUTES.JSON_TO_XML}`, icon: <Terminal size={18} /> },
        { name: 'Schema Generator', path: `/${ROUTES.JSON_TO_SCHEMA}`, icon: <Braces size={18} /> },
        { name: 'JSON to YAML', path: `/${ROUTES.JSON_TO_YAML}`, icon: <FileText size={18} /> },
        { name: 'JSON to TOML', path: `/${ROUTES.JSON_TO_TOML}`, icon: <FileCode size={18} /> },
        { name: 'JSON to TypeScript', path: `/${ROUTES.JSON_TO_TYPESCRIPT}`, icon: <FileJson size={18} /> },
    ];

    const glassClasses = isDarkMode
        ? 'bg-brand-background-dark/80 backdrop-blur-md border-brand-border-dark'
        : 'bg-white/80 backdrop-blur-md border-slate-200';

    return (
        <>
            <header className={`flex items-center justify-between h-14 md:h-16 border-b border-solid ${glassClasses} px-3 md:px-6 shrink-0 gap-2 md:gap-4 sticky top-0 z-50 transition-all`}>
                <div className="flex items-center gap-8">
                    <Link
                        to={ROUTES.HOME}
                        className="flex items-center gap-2 md:gap-3 min-w-0 group"
                        onClick={() => trackButtonClick('Logo Click', 'Header')}
                    >
                        <div className="size-7 md:size-8 bg-brand-primary rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                            <svg className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2h-4v20h4V2zm-8 4h-2v12h2V6zm12 0h-2v12h2V6z" />
                            </svg>
                        </div>
                        <h1 className="text-sm md:text-lg font-bold leading-tight tracking-tight truncate">
                            JSON Indenter <span className="text-brand-primary">Pro</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => trackNavigation(link.path, pathname)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? (isDarkMode ? 'bg-brand-primary/20 text-brand-primary shadow-sm' : 'bg-brand-primary/10 text-brand-primary font-semibold shadow-sm')
                                        : (isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                                        }`}
                                >
                                    {React.cloneElement(link.icon as React.ReactElement, { size: 16 })}
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <div className="hidden lg:flex">
                        {/* <AdUnit slot="header" /> */}
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => {
                                const newState = !isMenuOpen;
                                setIsMenuOpen(newState);
                                trackButtonClick(newState ? 'Open Mobile Menu' : 'Close Mobile Menu');
                            }}
                            className={`xl:hidden p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay - OUTSIDE header to avoid glass opacity inheritance */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[9999] xl:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <nav className={`absolute right-0 top-0 bottom-0 w-72 shadow-2xl p-6 flex flex-col gap-2 ${isDarkMode ? 'bg-[#0f172a] border-l border-slate-800' : 'bg-white border-l border-slate-200'
                        }`}>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                            All Utilities
                        </div>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => trackNavigation(link.path, `Mobile Menu (${pathname})`)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                        ? (isDarkMode ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-primary/10 text-brand-primary')
                                        : (isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-primary/20' : (isDarkMode ? 'bg-slate-800' : 'bg-slate-100')}`}>
                                        {link.icon}
                                    </div>
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}

                        <div className="mt-auto py-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="text-[10px] text-slate-400 font-mono uppercase text-center">
                                JSON Indenter Pro v1.0
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};
