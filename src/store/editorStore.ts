import { create } from 'zustand';

const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

interface EditorStore {
    inputJson: string;
    indentSize: number;
    indentType: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs';
    viewMode: 'text' | 'tree';
    error: string | null;
    errorLine: number | null;

    setInputJson: (json: string) => void;
    setIndentSize: (size: number) => void;
    setIndentType: (type: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs') => void;
    setViewMode: (mode: 'text' | 'tree') => void;
    setError: (error: string | null, line?: number | null) => void;
    clearAll: () => void;
    loadSample: () => void;

    // Toasts
    toasts: Toast[];
    addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    removeToast: (id: string) => void;
}

export type Toast = {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
};

const SAMPLE_JSON = {
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "profile": {
            "bio": "Software Developer",
            "location": "San Francisco, CA",
            "avatar": "https://example.com/avatar.jpg",
            "social": {
                "twitter": "@johndoe",
                "github": "johndoe",
                "linkedin": "john-doe"
            }
        },
        "preferences": {
            "theme": "dark",
            "notifications": true,
            "language": "en",
            "privacy": {
                "publicProfile": true,
                "showEmail": false,
                "allowMessages": true
            }
        },
        "createdAt": "2024-01-10T12:00:00Z",
        "updatedAt": "2024-01-10T15:30:00Z",
        "tags": ["developer", "react", "typescript", "tailwind"]
    },
    "metadata": {
        "version": "1.0.0",
        "apiVersion": "v2",
        "timestamp": "2024-01-10T20:45:30Z"
    }
};

export const useEditorStore = create<EditorStore>((set) => {
    // Load from localStorage on initialization
    const savedJson = localStorage.getItem('jsonIndenter_input') || '';
    const savedIndentType = (localStorage.getItem('jsonIndenter_indentType') || 'spaces2') as 'spaces2' | 'spaces3' | 'spaces4' | 'tabs';
    const savedViewMode = (localStorage.getItem('jsonIndenter_viewMode') || 'text') as 'text' | 'tree';

    return {
        inputJson: savedJson,
        indentSize: 2,
        indentType: savedIndentType,
        viewMode: savedViewMode,
        error: null,
        errorLine: null,

        setInputJson: (json: string) => {
            set({ inputJson: json, error: null, errorLine: null });
            try {
                if (json.length > MAX_STORAGE_SIZE) {
                    console.warn('JSON too large for localStorage, skipping save');
                    return;
                }
                localStorage.setItem('jsonIndenter_input', json);
            } catch (e) {
                if (e instanceof DOMException && e.code === 22) {
                    console.warn('localStorage quota exceeded');
                }
            }
        },

        setIndentSize: (size: number) => set({ indentSize: size }),

        setIndentType: (type: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs') => {
            set({ indentType: type });
            localStorage.setItem('jsonIndenter_indentType', type);
        },

        setViewMode: (mode: 'text' | 'tree') => {
            set({ viewMode: mode });
            localStorage.setItem('jsonIndenter_viewMode', mode);
        },

        setError: (error: string | null, line: number | null = null) => set({ error, errorLine: line }),

        clearAll: () => {
            set({ inputJson: '', error: null, errorLine: null });
            localStorage.removeItem('jsonIndenter_input');
        },

        loadSample: () => {
            const sampleJson = JSON.stringify(SAMPLE_JSON, null, 2);
            set({ inputJson: sampleJson, error: null, errorLine: null });
            localStorage.setItem('jsonIndenter_input', sampleJson);
        },

        toasts: [],
        addToast: (message, type = 'success') => {
            const id = Math.random().toString(36).substring(2, 9);
            set((state) => ({
                toasts: [...state.toasts, { id, message, type }]
            }));
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id)
                }));
            }, 3000);
        },
        removeToast: (id) => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id)
            }));
        },
    };
});
