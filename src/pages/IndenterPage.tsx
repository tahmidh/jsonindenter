import React, { useEffect, useMemo } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { Toolbar } from '../components/Toolbar';
import { IndentationSettings } from '../components/IndentationSettings';
import { ViewModeToggle } from '../components/ViewModeToggle';
import { TreeView } from '../components/TreeView';
import { EditorPanel } from '../components/EditorPanel';
import { SEO } from '../components/SEO';
import { getPageSEO } from '../config/seo';
import { getLineCount, validateJSON, formatJSON } from '../utils/editor';
import { trackButtonClick, trackToolUsage } from '../utils/analytics';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InlineTip } from '../components/InlineTip';
import { WhatsNextSection } from '../components/WhatsNextSection';
import { pageEnhancements } from '../config/pageEnhancements';

export const IndenterPage: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const {
        inputJson,
        indentType,
        viewMode,
        error,
        setInputJson,
        setError,
        addToast,
    } = useEditorStore();

    const [isDragging, setIsDragging] = React.useState(false);

    // Memoize formatted output to avoid recalculation on every render
    const formattedOutput = useMemo(() => {
        if (!inputJson.trim()) return '';
        const { formatted, error, line } = formatJSON(inputJson, indentType);
        if (error) {
            const validation = validateJSON(inputJson);
            setTimeout(() => setError(validation.error || error, validation.line || line), 0);
            return '';
        }
        return formatted;
    }, [inputJson, indentType, setError]);

    // Save to localStorage whenever inputJson changes
    useEffect(() => {
        localStorage.setItem('jsonInput', inputJson);
    }, [inputJson]);

    // Handle editor changes
    const handleEditorChange = (value: string) => {
        setInputJson(value);
        setError(null);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            // Validate file type
            if (!file.type.includes('json') && !file.name.endsWith('.json')) {
                setError('Only JSON files are supported');
                return;
            }

            // Validate file size (50MB limit)
            const MAX_FILE_SIZE = 50 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                setError(`File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = event.target?.result as string;
                    const validation = validateJSON(content);
                    if (validation.valid) {
                        setInputJson(content);
                        setError(null);
                        trackToolUsage('JSON Drop', 'File Dropped');
                    } else {
                        setError(`Invalid JSON file: ${validation.error}`);
                    }
                } catch (err) {
                    setError('Failed to read file');
                }
            };
            reader.onerror = () => {
                setError('Failed to read file');
            };
            reader.readAsText(file);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputJson(text);
            setError(null);
            trackButtonClick('Floating Paste Button');
        } catch (err) {
            setError('Failed to read from clipboard');
        }
    };

    return (
        <>
            <SEO {...getPageSEO('home')} />
            {/* Toolbar Section - Responsive Grid */}
            <nav className={`flex flex-col gap-2 px-3 md:px-6 py-2 md:py-3 border-b shrink-0 ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
                    <div className="flex-shrink-0">
                        <IndentationSettings />
                    </div>
                    <div className="flex-shrink-0">
                        <ViewModeToggle />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Toolbar />
                </div>
            </nav>

            <div className={`px-4 md:px-6 py-3 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                <Breadcrumbs items={pageEnhancements.indenter.breadcrumbs} />
            </div>

            <InlineTip tip={pageEnhancements.indenter.inlineTip} />

            {/* Main Workspace */}
            <div className={`flex flex-col lg:flex-row flex-1 overflow-hidden p-2 md:p-4 gap-2 md:gap-4 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                {/* Left Panel: Input */}
                <section className={`flex-1 flex flex-col rounded-lg md:rounded-xl border shadow-sm overflow-hidden min-h-[300px] lg:min-h-96 ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                    <div className={`flex items-center justify-between px-3 md:px-4 py-2 border-b text-xs md:text-sm ${isDarkMode ? 'border-brand-border-dark bg-brand-panel-dark' : 'border-slate-100 bg-slate-50/50'}`}>
                        <span className="font-bold uppercase tracking-widest text-slate-400">Input</span>
                        <span className="font-mono text-slate-400 text-[10px]">UTF-8</span>
                    </div>
                    {error && (
                        <div className="mx-3 md:mx-4 mt-3 md:mt-4 mb-3 md:mb-4 p-3 md:p-4 rounded-lg bg-rose-500/10 border border-rose-500/30">
                            <p className="text-rose-400 text-xs md:text-sm font-medium">
                                <span className="font-bold">⚠ Error:</span> {error}
                            </p>
                        </div>
                    )}
                    <div className="flex-1 relative">
                        <EditorPanel
                            value={inputJson}
                            onChange={handleEditorChange}
                            isDarkMode={isDarkMode}
                            indentType={indentType}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            isDragging={isDragging}
                            showError={true}
                            path="indenter-input.json"
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
                </section>

                {/* Right Panel: Output */}
                <section className={`flex-1 flex flex-col rounded-lg md:rounded-xl border shadow-sm overflow-hidden min-h-[300px] lg:min-h-96 ${isDarkMode ? 'bg-brand-panel-dark border-brand-border-dark' : 'bg-white border-slate-200'}`}>
                    <div className={`flex items-center justify-between px-3 md:px-4 py-2 border-b text-xs md:text-sm ${isDarkMode ? 'border-brand-border-dark bg-brand-panel-dark' : 'border-slate-100 bg-slate-50/50'}`}>
                        <span className="font-bold uppercase tracking-widest text-slate-400">
                            {viewMode === 'text' ? 'Formatted Output' : 'Tree View'}
                        </span>
                        {viewMode === 'text' && inputJson.trim() && !error && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>VALID JSON</span>
                        )}
                    </div>
                    <div className="flex-1 relative">
                        {viewMode === 'text' ? (
                            <EditorPanel
                                value={formattedOutput}
                                isDarkMode={isDarkMode}
                                indentType={indentType}
                                readOnly={true}
                                path="indenter-output.json"
                            >
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(formattedOutput);
                                        addToast('Copied to clipboard', 'success');
                                        trackButtonClick('Floating Copy Button');
                                    }}
                                    className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2 px-3 md:px-4 py-2 bg-brand-primary text-white rounded-full text-xs font-bold shadow-lg shadow-brand-primary/20 hover:bg-opacity-90 hover:scale-105 transition-all z-5"
                                    title="Copy formatted JSON"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                                    </svg>
                                    Copy
                                </button>
                            </EditorPanel>
                        ) : (
                            <TreeView />
                        )}
                    </div>
                </section>
            </div>

            <div className={`px-4 md:px-6 py-6 ${isDarkMode ? 'bg-brand-background-dark' : 'bg-slate-50'}`}>
                <WhatsNextSection
                    links={pageEnhancements.indenter.whatsNextLinks}
                    context="indenter-next-steps"
                />
            </div>

            {/* Status Bar */}
            <footer className={`h-8 md:h-10 border-t px-3 md:px-4 flex items-center justify-between text-[10px] md:text-[11px] font-medium shrink-0 overflow-x-auto ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1 md:gap-1.5">
                        <span className="size-1.5 md:size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="hidden sm:inline">Status: Ready</span>
                        <span className="sm:hidden">Ready</span>
                    </div>
                    <div className={`h-3 w-px ${isDarkMode ? 'bg-brand-border-dark' : 'bg-slate-300'}`}></div>
                    <div className="hidden sm:block">Spaces: {indentType === 'spaces2' ? '2' : indentType === 'spaces3' ? '3' : indentType === 'spaces4' ? '4' : 'tabs'}</div>
                </div>
                <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                    <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-[11px]">
                        <span className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}>Ln</span>
                        <span className="hidden sm:inline">1</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                        <span className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}>Col</span> 1
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-[11px]">
                        <span className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}>CH:</span> <span>{inputJson.length}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1">
                        <span className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}>Lines:</span> {getLineCount(inputJson)}
                    </div>
                </div>
            </footer>
        </>
    );
};
