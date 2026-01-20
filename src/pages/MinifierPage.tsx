import React, { useMemo } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { EditorPanel } from '../components/EditorPanel';
import { SEO } from '../components/SEO';
import { getPageSEO } from '../config/seo';
import { Zap, Copy } from 'lucide-react';
import { trackButtonClick, trackToolUsage } from '../utils/analytics';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InlineTip } from '../components/InlineTip';
import { WhatsNextSection } from '../components/WhatsNextSection';
import { pageEnhancements } from '../config/pageEnhancements';

export const MinifierPage: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const { inputJson, setInputJson, addToast, setError } = useEditorStore();

    const minifiedOutput = useMemo(() => {
        if (!inputJson.trim()) return '';
        try {
            const parsed = JSON.parse(inputJson);
            return JSON.stringify(parsed);
        } catch {
            return '';
        }
    }, [inputJson]);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setInputJson(text);
                addToast('JSON pasted from clipboard', 'success');
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err);
            setError('Failed to read from clipboard');
        }
    };

    const handleCopy = () => {
        if (minifiedOutput) {
            navigator.clipboard.writeText(minifiedOutput);
            trackButtonClick('Copy Minified', 'Minifier Page');
            trackToolUsage('JSON Minifier', 'Minify (Copy)');
        }
    };

    const stats = useMemo(() => {
        if (!inputJson.trim()) return null;
        const originalSize = new Blob([inputJson]).size;
        const minifiedSize = new Blob([minifiedOutput]).size;
        const savings = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0;
        return { originalSize, minifiedSize, savings };
    }, [inputJson, minifiedOutput]);

    return (
        <>
            <SEO {...getPageSEO('minifier')} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <nav className={`px-4 md:px-6 py-3 border-b flex items-center justify-between ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                    <h1 className={`font-bold uppercase tracking-widest text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        JSON Compression Utility
                    </h1>
                    {stats && (
                        <div className="flex items-center gap-3 text-[10px] md:text-xs">
                            <span className="opacity-50">Compression:</span>
                            <span className="font-bold text-emerald-500">{stats.savings}% Reduced</span>
                        </div>
                    )}
                </nav>

                <div className={`px-4 md:px-6 py-3 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <Breadcrumbs items={pageEnhancements.minifier.breadcrumbs} />
                </div>

                <InlineTip tip={pageEnhancements.minifier.inlineTip} />

                <div className={`flex flex-col lg:flex-row flex-1 overflow-hidden p-2 md:p-4 gap-4 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <div className="flex-1 flex flex-col min-h-0 min-w-0">
                        <div className={`flex-1 min-h-[500px] relative rounded-xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                            <div className={`px-4 py-2 border-b text-xs font-bold uppercase tracking-wider flex justify-between items-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
                                <span>Input</span>
                                <span className="opacity-40 font-mono">{(stats?.originalSize || 0)} B</span>
                            </div>
                            <div className="absolute inset-0 top-9">
                                <EditorPanel
                                    value={inputJson}
                                    onChange={setInputJson}
                                    isDarkMode={isDarkMode}
                                    indentType="spaces2"
                                    path="minifier-input.json"
                                >
                                    <button
                                        onClick={handlePaste}
                                        className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2 px-3 md:px-4 py-2 bg-brand-primary text-white rounded-full text-xs font-bold shadow-lg shadow-brand-primary/20 hover:bg-opacity-90 hover:scale-105 transition-all z-5"
                                        title="Paste JSON from clipboard"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" />
                                        </svg>
                                        Paste
                                    </button>
                                </EditorPanel>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 min-w-0">
                        <div className={`flex-1 min-h-[500px] relative rounded-xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                            <div className={`px-4 py-2 border-b text-xs font-bold uppercase tracking-wider flex justify-between items-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
                                <span className="flex items-center gap-2">
                                    Minified Result <Zap size={12} className="text-yellow-500" />
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 hover:text-brand-primary transition-colors disabled:opacity-30"
                                    disabled={!minifiedOutput}
                                >
                                    <Copy size={12} /> COPY
                                </button>
                            </div>
                            <div className="absolute inset-0 top-9">
                                <EditorPanel
                                    value={minifiedOutput}
                                    isDarkMode={isDarkMode}
                                    readOnly={true}
                                    indentType="spaces2"
                                    path="minifier-output.json"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`px-4 md:px-6 py-6 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <WhatsNextSection
                        links={pageEnhancements.minifier.whatsNextLinks}
                        context="minifier-next-steps"
                    />
                </div>
            </div>
        </>
    );
};
