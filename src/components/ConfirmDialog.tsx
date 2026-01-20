import React from 'react';
import { useThemeStore } from '../store/themeStore';

/**
 * Confirm Dialog Component - Tailwind-based modal for confirmations
 */
export const ConfirmDialog: React.FC<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    dangerous?: boolean;
}> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    dangerous = false,
}) => {
        const { isDarkMode } = useThemeStore();

        if (!isOpen) return null;

        return (
            <>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-25'} flex items-center justify-center z-50 backdrop-blur-sm`}
                    onClick={onCancel}
                >
                    {/* Modal */}
                    <div
                        className={`rounded-lg shadow-lg p-6 max-w-sm mx-4 border ${isDarkMode
                            ? 'bg-brand-panel-dark border-brand-border-dark'
                            : 'bg-white border-slate-200'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Title */}
                        <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {title}
                        </h2>

                        {/* Message */}
                        <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {message}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onCancel}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium border ${isDarkMode
                                    ? 'bg-brand-border-dark text-slate-300 hover:bg-brand-panel-dark border-brand-border-dark'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                                    }`}
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${dangerous
                                    ? isDarkMode
                                        ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                        : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                                    : `bg-brand-primary text-white hover:opacity-90 border border-brand-primary`
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

