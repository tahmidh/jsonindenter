import React, { memo, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { getIndentConfig } from '../utils/editor';
import { ErrorBoundary } from './ErrorBoundary';
import { useEditorStore } from '../store/editorStore';
import * as monaco from 'monaco-editor';
import { FileJson, Upload } from 'lucide-react';

interface EditorPanelProps {
    value: string;
    onChange?: (value: string) => void;
    isDarkMode: boolean;
    indentType: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs';
    readOnly?: boolean;
    onDragEnter?: (e: React.DragEvent) => void;
    onDragLeave?: (e: React.DragEvent) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent) => void;
    isDragging?: boolean;
    children?: React.ReactNode;
    showError?: boolean;
    path?: string;
}

export const EditorPanel: React.FC<EditorPanelProps> = memo(({
    value,
    onChange,
    isDarkMode,
    indentType,
    readOnly = false,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    isDragging = false,
    children,
    showError = false,
    path,
}) => {
    const { tabSize, insertSpaces } = getIndentConfig(indentType);
    const { errorLine } = useEditorStore();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const decorationsRef = useRef<string[]>([]);

    useEffect(() => {
        if (editorRef.current && showError) {
            const decorations: monaco.editor.IModelDeltaDecoration[] = [];

            if (errorLine) {
                decorations.push({
                    range: new monaco.Range(errorLine, 1, errorLine, 1),
                    options: {
                        isWholeLine: true,
                        className: 'error-line-highlight',
                        glyphMarginClassName: 'error-glyph-margin',
                    }
                });
            }

            decorationsRef.current = editorRef.current.deltaDecorations(
                decorationsRef.current,
                decorations
            );
        } else if (editorRef.current && decorationsRef.current.length > 0) {
            decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
        }
    }, [errorLine, showError]);

    const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    return (
        <ErrorBoundary>
            <div
                className="absolute inset-0 flex"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {/* Editor */}
                <div className={`flex-1 ${isDarkMode ? 'bg-[#0B0E14]' : 'bg-white'}`}>
                    <Editor
                        height="100%"
                        language="json"
                        value={value}
                        path={path}
                        onChange={(val) => onChange?.(val || '')}
                        theme={isDarkMode ? 'brand-dark' : 'brand-light'}
                        onMount={handleEditorDidMount}
                        options={{
                            minimap: { enabled: false },
                            wordWrap: 'on',
                            fontSize: 12,
                            fontFamily: 'JetBrains Mono, Fira Code, monospace',
                            fontLigatures: true,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            readOnly,
                            tabSize,
                            insertSpaces,
                        }}
                    />
                </div>

                {/* Dropzone Overlay */}
                {isDragging && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-brand-primary/10 backdrop-blur-[2px] border-2 border-dashed border-brand-primary animate-in fade-in zoom-in duration-200">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-3">
                            <div className="size-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                <Upload size={24} />
                            </div>
                            <p className="text-sm font-bold">Drop JSON File Here</p>
                        </div>
                    </div>
                )}

                {/* Empty State Overlay */}
                {!value && !isDragging && !readOnly && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-40 group-hover:opacity-60 transition-opacity">
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-4 rounded-3xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                                <FileJson size={40} className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold uppercase tracking-widest mb-1">Editor Empty</p>
                                <p className="text-xs font-medium">Paste JSON or drop a file to begin</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Extra content (like paste button) */}
                {children}
            </div>
        </ErrorBoundary>
    );
});
