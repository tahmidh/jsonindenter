import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { EditorPanel } from '../components/EditorPanel';
import { SEO } from '../components/SEO';
import { getPageSEO } from '../config/seo';
import { validateJSON } from '../utils/editor';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InlineTip } from '../components/InlineTip';
import { WhatsNextSection } from '../components/WhatsNextSection';
import { pageEnhancements } from '../config/pageEnhancements';

export const ValidatorPage: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const { inputJson, setInputJson, error, setError, errorLine, addToast } = useEditorStore();

    const handleEditorChange = (value: string) => {
        setInputJson(value);
        const { valid, error: validationError, line } = validateJSON(value);
        if (value.trim() && !valid) {
            setError(validationError || 'Invalid JSON', line);
        } else {
            setError(null);
        }
    };

    const handlePaste = async () => {
        try {
            // Add timeout for clipboard operations (5 seconds)
            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Clipboard read timeout')), 5000)
            );

            const text = await Promise.race([
                navigator.clipboard.readText(),
                timeoutPromise
            ]);

            // Validate clipboard content is reasonable size (50MB limit)
            if (text.length > 50 * 1024 * 1024) {
                const errorMsg = 'Clipboard content too large (max 50MB)';
                addToast(errorMsg, 'error');
                setError(errorMsg);
                return;
            }

            if (text) {
                handleEditorChange(text);
                addToast('JSON pasted from clipboard', 'success');
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err);
            const errorMsg = err instanceof Error ? err.message : 'Failed to read from clipboard';
            addToast(errorMsg, 'error');
            setError(errorMsg);
        }
    };

    const isValid = inputJson.trim() && !error;

    return (
        <>
            <SEO {...getPageSEO('validator')} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <nav className={`px-4 md:px-6 py-3 border-b flex items-center justify-between ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-4">
                        <h1 className={`font-bold uppercase tracking-widest text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            JSON Syntax Validator
                        </h1>
                        {inputJson.trim() && (
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${isValid
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                }`}>
                                {isValid ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                {isValid ? 'VALID JSON' : 'INVALID SYNTAX'}
                            </div>
                        )}
                    </div>
                </nav>

                <div className={`px-4 md:px-6 py-3 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <Breadcrumbs items={pageEnhancements.validator.breadcrumbs} />
                </div>

                <InlineTip tip={pageEnhancements.validator.inlineTip} />

                <div className={`flex flex-col lg:flex-row flex-1 overflow-hidden p-2 md:p-4 gap-4 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className={`flex-1 min-h-[500px] relative rounded-xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                            <div className={`px-4 py-2 border-b text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
                                JSON Input
                            </div>
                            <div className="absolute inset-0 top-9">
                                <EditorPanel
                                    value={inputJson}
                                    onChange={handleEditorChange}
                                    isDarkMode={isDarkMode}
                                    indentType="spaces2"
                                    showError={true}
                                    path="validator-input.json"
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

                    <div className="lg:w-80 flex flex-col gap-4">
                        <div className={`p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <AlertCircle size={18} className="text-brand-primary" />
                                Validation Report
                            </h3>

                            {!inputJson.trim() ? (
                                <p className="text-sm opacity-50 italic">Waiting for input...</p>
                            ) : isValid ? (
                                <div className="space-y-4">
                                    <p className="text-sm text-emerald-500 font-medium leading-relaxed">
                                        Your JSON is perfectly valid and follows standard RFC format.
                                    </p>
                                    <div className="text-[10px] opacity-50 font-mono uppercase">
                                        Size: {(inputJson.length / 1024).toFixed(2)} KB
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-rose-500 font-bold">
                                        Error found on Line {errorLine}:
                                    </p>
                                    <div className={`p-3 rounded bg-rose-500/5 border border-rose-500/10 font-mono text-xs text-rose-400 break-words`}>
                                        {error}
                                    </div>
                                    <p className="text-xs opacity-60">
                                        Review the highlighted line in the editor to fix the syntax error.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className={`p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                            <h3 className="font-bold mb-3 text-sm italic opacity-50">Quick Tips</h3>
                            <ul className="text-xs space-y-2 opacity-70">
                                <li>• Strings must be in double quotes.</li>
                                <li>• No trailing commas in arrays/objects.</li>
                                <li>• All keys must be double-quoted.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`px-4 md:px-6 py-6 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                    <WhatsNextSection
                        links={pageEnhancements.validator.whatsNextLinks}
                        context="validator-related-tools"
                    />
                </div>
            </div>
        </>
    );
};
