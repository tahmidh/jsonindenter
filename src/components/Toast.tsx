import React from 'react';
import type { Toast as ToastType } from '../store/editorStore';
import { useEditorStore } from '../store/editorStore';
import { useThemeStore } from '../store/themeStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useEditorStore();

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

const Toast: React.FC<{ toast: ToastType; onClose: () => void }> = ({ toast, onClose }) => {
    const { isDarkMode } = useThemeStore();

    const icons = {
        success: <CheckCircle2 size={18} className="text-emerald-500" />,
        error: <AlertCircle size={18} className="text-rose-500" />,
        info: <Info size={18} className="text-blue-500" />
    };

    const bgClass = isDarkMode
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200';

    return (
        <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl animate-toast-slide-in min-w-[200px] max-w-sm ${bgClass}`}>
            {icons[toast.type as keyof typeof icons]}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
                <X size={14} className="opacity-50" />
            </button>
        </div>
    );
};
