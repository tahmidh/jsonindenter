import React, { useMemo } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { EditorPanel } from '../components/EditorPanel';
import { SEO } from '../components/SEO';
import { getPageSEO } from '../config/seo';
import { jsonToToml } from '../utils/editor';
import { Copy, FileCode } from 'lucide-react';
import { trackButtonClick, trackToolUsage } from '../utils/analytics';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InlineTip } from '../components/InlineTip';
import { WhatsNextSection } from '../components/WhatsNextSection';
import { pageEnhancements } from '../config/pageEnhancements';
export const JsonToTomlPage: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const { inputJson, setInputJson, addToast, setError } = useEditorStore();

    const tomlOutput = useMemo(() => {
        if (!inputJson.trim()) return '';
        return jsonToToml(inputJson);
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
        if (tomlOutput) {
            navigator.clipboard.writeText(tomlOutput);
            trackButtonClick('Copy TOML', 'TOML Converter Page');
            trackToolUsage('TOML Converter', 'Copy TOML');
            addToast('TOML copied to clipboard', 'success');
        }
    };

    return (
        <>
            <SEO {...getPageSEO('json-to-toml')} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <nav className={`px-4 md:px-6 py-3 border-b flex items-center justify-between ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                    <h1 className={`font-bold uppercase tracking-widest text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        JSON to TOML Converter
                    </h1>
                    <button
                        onClick={handleCopy}
                        disabled={!tomlOutput}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isDarkMode
                            ? 'bg-brand-primary/20 text-brand-primary hover:bg-brand-primary/30'
                            : 'bg-brand-primary text-white hover:bg-brand-primary/90'
                            } disabled:opacity-30`}
                    >
                        <Copy size={14} /> COPY TOML
                    </button>
                </nav>

                <div className={`px-4 md:px-6 py-3 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <Breadcrumbs items={pageEnhancements['json-to-toml'].breadcrumbs} />
                </div>

                <InlineTip tip={pageEnhancements['json-to-toml'].inlineTip} />

                <div className={`flex flex-col lg:flex-row flex-1 overflow-hidden p-2 md:p-4 gap-4 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    {/* Input Section */}
                    <div className="flex-1 flex flex-col min-h-0 min-w-0">
                        <div className={`flex-1 min-h-[500px] relative rounded-xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                            <div className={`px-4 py-2 border-b text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
                                JSON Input
                            </div>
                            <div className="absolute inset-0 top-9">
                                <EditorPanel
                                    value={inputJson}
                                    onChange={setInputJson}
                                    isDarkMode={isDarkMode}
                                    indentType="spaces2"
                                    path="toml-input.json"
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

                    {/* Output Section */}
                    <div className="flex-1 flex flex-col min-h-0 min-w-0">
                        <div className={`flex-1 min-h-[500px] relative rounded-xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                            <div className={`px-4 py-2 border-b text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
                                TOML Result <FileCode size={14} className="text-emerald-500" />
                            </div>
                            <div className="absolute inset-0 top-9">
                                <EditorPanel
                                    value={tomlOutput}
                                    isDarkMode={isDarkMode}
                                    readOnly={true}
                                    indentType="spaces2"
                                    path="toml-output.toml"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`px-4 md:px-6 py-6 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <WhatsNextSection
                        links={pageEnhancements['json-to-toml'].whatsNextLinks}
                        context="json-to-toml-related-tools"
                    />
                </div>
            </div>
        </>
    );
};
