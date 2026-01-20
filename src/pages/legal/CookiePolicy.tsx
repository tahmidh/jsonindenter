import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';
import { useThemeStore } from '../../store/themeStore';

export const CookiePolicy: React.FC = () => {
    const { isDarkMode } = useThemeStore();

    return (
        <>
            <SEO {...getPageSEO('cookies')} />
            <StaticPageLayout
                title="Cookie Policy"
                description="How we use cookies and local storage to improve your experience."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-6">
                    <h3>1. What Are Cookies?</h3>
                    <p>
                        Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser.
                    </p>

                    <h3>2. How We Use Cookies</h3>
                    <p>
                        We use cookies for a limited number of purposes:
                    </p>
                    <ul>
                        <li><strong>Preferences:</strong> We use LocalStorage (similar to cookies) to remember your dark mode setting and indentation preference (2 spaces vs 4 spaces).</li>
                        <li><strong>Analytics:</strong> First-party Google Analytics cookies help us understand how visitors interact with the website. This data is anonymous.</li>
                    </ul>

                    <h3>3. Essential Local Storage Keys</h3>
                    <p>
                        These keys are stored in your browser's Local Storage to maintain your session state:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className={`uppercase tracking-wider border-b-2 font-bold ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                                <tr>
                                    <th scope="col" className="px-4 py-3">Key Name</th>
                                    <th scope="col" className="px-4 py-3">Purpose</th>
                                    <th scope="col" className="px-4 py-3">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={`border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                    <td className="px-4 py-3 font-mono">theme-mode</td>
                                    <td className="px-4 py-3">Stores your preference for Light or Dark mode.</td>
                                    <td className="px-4 py-3">Functional</td>
                                </tr>
                                <tr className={`border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                    <td className="px-4 py-3 font-mono">editor-indent-type</td>
                                    <td className="px-4 py-3">Remembers if you prefer 2 spaces, 4 spaces, or tabs.</td>
                                    <td className="px-4 py-3">Functional</td>
                                </tr>
                                <tr className={`border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                    <td className="px-4 py-3 font-mono">jsonInput</td>
                                    <td className="px-4 py-3">Temporarily saves your work so you don't lose it on refresh.</td>
                                    <td className="px-4 py-3">Functional</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>4. Managing Cookies</h3>
                    <p>
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies/local storage, some portions of our Service (like saving your work) may not function properly.
                    </p>
                </section>
            </StaticPageLayout>
        </>
    );
};
