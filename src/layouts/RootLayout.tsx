import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useEditorTheme } from '../hooks/useEditorTheme';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SeoContent } from '../components/SeoContent';
// import { AdUnit } from '../components/AdUnit';
import { ToastContainer } from '../components/Toast';

export const RootLayout: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    useEditorTheme(); // Initialize editor themes
    const { pathname } = useLocation();

    // Initialize theme on mount
    useEffect(() => {
        const theme = localStorage.getItem('theme-mode') || 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-brand-background-dark text-white' : 'bg-slate-50 text-slate-900'}`}>
            <ToastContainer />
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>

            {/* Global Ad Space */}
            {/* <div className="px-3 md:px-6 mt-auto">
                <AdUnit slot="footer" />
            </div> */}

            {/* SEO & Footer */}
            <SeoContent />
            <Footer />
        </div>
    );
};
