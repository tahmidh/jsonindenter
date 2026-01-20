import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { ShieldCheck, Lock, ServerOff } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';
import { useThemeStore } from '../../store/themeStore';

export const Security: React.FC = () => {
    const { isDarkMode } = useThemeStore();

    return (
        <>
            <SEO {...getPageSEO('security')} />
            <StaticPageLayout
                title="Security Architecture"
                description="Transparency about how we secure your data and our infrastructure."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-12">
                    {/* Hero Feature */}
                    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-800'}`}>
                        <div className="flex items-start gap-4">
                            <ShieldCheck className={`w-8 h-8 flex-shrink-0 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">Zero-Knowledge Architecture</h3>
                                <p className="m-0 text-sm opacity-90">
                                    We have designed JSON Indenter Pro as a "Zero-Knowledge" application. This means we technically cannot see, store, or share your data because it never leaves your physical device. The code runs exclusively in your browser's JavaScript engine.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <ServerOff className="w-6 h-6 text-brand-primary" />
                                <h3 className="m-0">Serverless Processing</h3>
                            </div>
                            <p className="text-sm opacity-80 leading-relaxed">
                                Traditional online tools send your data to a backend server to be processed. We do not. Whether you paste 1KB or 10MB of JSON, the processing happens on your CPU, not ours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Lock className="w-6 h-6 text-brand-primary" />
                                <h3 className="m-0">HTTPS Encryption</h3>
                            </div>
                            <p className="text-sm opacity-80 leading-relaxed">
                                Even though we don't transmit your JSON data, all traffic to download our application code is encrypted via SSL/TLS (HTTPS). This ensures that no one can tamper with the tool's code while it's being delivered to you.
                            </p>
                        </div>
                    </div>

                    <h3>Vulnerability Reporting</h3>
                    <p>
                        If you discover a security vulnerability in our application, please report it immediately to <a href="mailto:security@jsonindenter.com">security@jsonindenter.com</a>. We take all reports seriously and will investigate promptly.
                    </p>
                </section>
            </StaticPageLayout>
        </>
    );
};
