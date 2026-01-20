import React, { useCallback, useState } from 'react';
import {
    Copy,
    Trash2,
    Download,
    Upload,
    Zap,
    FileJson,
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { formatJson } from '../utils/jsonFormatter';
import { ConfirmDialog } from './ConfirmDialog';
import { trackButtonClick, trackToolUsage } from '../utils/analytics';

/**
 * Toolbar component with action buttons
 */
export const Toolbar: React.FC = () => {
    const { inputJson, indentType, setInputJson, setError, clearAll, loadSample, addToast } = useEditorStore();
    const { isDarkMode } = useThemeStore();
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // Handle Format/Indent
    const handleFormat = useCallback(() => {
        const { formatted, error } = formatJson(inputJson, indentType);
        setInputJson(formatted);
        if (error) {
            setError(error);
        } else {
            addToast('JSON Formatted successfully', 'success');
            trackToolUsage('JSON Formatter', 'Format');
        }
    }, [inputJson, indentType, setInputJson, setError, addToast]);


    // Handle Copy to Clipboard
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(inputJson);
            addToast('Copied to clipboard!', 'success');
            trackButtonClick('Copy to Clipboard');
        } catch (err) {
            setError('Failed to copy to clipboard');
        }
    }, [inputJson, addToast, setError]);

    // Handle Clear
    const handleClear = useCallback(() => {
        setShowClearConfirm(true);
    }, []);

    const handleClearConfirm = useCallback(() => {
        setShowClearConfirm(false);
        clearAll();
        trackButtonClick('Clear JSON Content');
    }, [clearAll]);

    // Handle File Upload
    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.includes('json') && !file.name.endsWith('.json')) {
            setError('Only JSON files are supported');
            event.target.value = '';
            return;
        }

        // Validate file size (50MB limit)
        const MAX_FILE_SIZE = 50 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            setError(`File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`);
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                // Validate JSON before setting
                JSON.parse(content);
                setInputJson(content);
                setError(null);
                trackToolUsage('JSON Upload', 'Upload File');
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Invalid JSON file';
                setError(`File Error: ${errorMessage}`);
            }
        };
        reader.onerror = () => {
            setError('Failed to read file');
        };
        reader.readAsText(file);

        // Reset input so same file can be uploaded again
        event.target.value = '';
    }, [setInputJson, setError]);

    // Handle Download
    const handleDownload = useCallback(() => {
        try {
            const element = document.createElement('a');
            element.setAttribute(
                'href',
                `data:text/json;charset=utf-8,${encodeURIComponent(inputJson)}`
            );
            element.setAttribute('download', 'data.json');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            trackToolUsage('JSON Download', 'Download File');
        } catch (err) {
            setError('Failed to download file');
        }
    }, [inputJson, setError]);

    const ToolButton: React.FC<{
        onClick: () => void;
        icon: React.ReactNode;
        label: string;
        variant?: 'primary' | 'secondary' | 'danger';
        disabled?: boolean;
    }> = ({ onClick, icon, label, variant = 'secondary', disabled = false }) => {
        const baseClasses = 'flex items-center gap-1 sm:gap-2 h-8 sm:h-10 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200';

        const variants = {
            primary: `bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-opacity-90`,
            secondary: isDarkMode
                ? 'bg-brand-panel-dark text-white hover:bg-brand-border-dark border border-brand-border-dark'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
            danger: isDarkMode
                ? 'text-rose-500 hover:bg-rose-500/10'
                : 'text-rose-500 hover:bg-rose-50',
        };

        const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

        return (
            <button
                onClick={onClick}
                title={label}
                disabled={disabled}
                className={`${baseClasses} ${variants[variant]} ${disabledClasses}`}
                style={variant === 'primary' && !disabled ? { boxShadow: '0 10px 40px rgba(46, 91, 255, 0.3)' } : undefined}
            >
                {icon}
                <span className="hidden sm:inline">{label}</span>
            </button>
        );
    };

    return (
        <div className="flex flex-wrap gap-2 w-full">
            {/* Main Actions */}
            <ToolButton
                onClick={handleFormat}
                icon={<Zap size={16} className="sm:w-5 sm:h-5" />}
                label="Format"
                variant="primary"
            />
            <ToolButton
                onClick={handleCopy}
                icon={<Copy size={16} className="sm:w-5 sm:h-5" />}
                label="Copy"
                disabled={!inputJson.trim()}
            />
            <ToolButton
                onClick={handleDownload}
                icon={<Download size={16} className="sm:w-5 sm:h-5" />}
                label="Download"
                disabled={!inputJson.trim()}
            />
            <ToolButton
                onClick={loadSample}
                icon={<FileJson size={16} className="sm:w-5 sm:h-5" />}
                label="Sample"
            />
            <label className="cursor-pointer">
                <span className={`flex items-center gap-1 sm:gap-2 h-8 sm:h-10 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${isDarkMode
                    ? 'bg-brand-panel-dark text-white hover:bg-brand-border-dark border border-brand-border-dark'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}>
                    <Upload size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Upload</span>
                </span>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>
            <ToolButton
                onClick={handleClear}
                icon={<Trash2 size={16} className="sm:w-5 sm:h-5" />}
                label="Clear"
                variant="danger"
            />

            {/* Clear Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showClearConfirm}
                title="Clear All Content?"
                message="This will delete all your JSON data. This action cannot be undone."
                onConfirm={handleClearConfirm}
                onCancel={() => setShowClearConfirm(false)}
                confirmText="Clear"
                cancelText="Cancel"
                dangerous={true}
            />
        </div>
    );
};
