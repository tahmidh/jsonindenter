import React, { useEffect } from 'react';
import { useMonaco } from '@monaco-editor/react';

interface ThemeColors {
    [key: string]: string;
}

interface ThemeConfig {
    base: 'vs' | 'vs-dark';
    inherit: boolean;
    rules: [];
    colors: ThemeColors;
}

const DARK_THEME: ThemeConfig = {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#0B0E14',
        'editor.selectionBackground': '#3680f73d',
        'editorBracketMatch.background': '#3680f71a',
        'editorBracketMatch.border': '#3680f7',
        'editor.scrollbarSlider.background': '#3680f733',
        'editor.scrollbarSlider.hoverBackground': '#3680f755',
        'editor.scrollbarSlider.activeBackground': '#3680f788',
        'editorCursor.foreground': '#3680f7',
        'editorLineNumber.foreground': '#4b5563',
        'editorLineNumber.activeForeground': '#3680f7',
        'editor.lineNumbersBackground': '#0B0E1400',
        'editorGutter.background': '#0B0E1400',
    }
};

const LIGHT_THEME: ThemeConfig = {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#FFFFFF',
        'editor.selectionBackground': '#3680f73d',
        'editorBracketMatch.background': '#3680f71a',
        'editorBracketMatch.border': '#3680f7',
        'editor.scrollbarSlider.background': '#0000001a',
        'editor.scrollbarSlider.hoverBackground': '#00000033',
        'editor.scrollbarSlider.activeBackground': '#00000055',
        'editorCursor.foreground': '#3680f7',
        'editorLineNumber.foreground': '#94a3b8',
        'editorLineNumber.activeForeground': '#3680f7',
        'editor.lineNumbersBackground': '#FFFFFF00',
        'editorGutter.background': '#FFFFFF00',
    }
};

export const useEditorTheme = () => {
    const monaco = useMonaco();
    const [themesLoaded, setThemesLoaded] = React.useState(false);

    useEffect(() => {
        if (monaco) {
            try {
                monaco.editor.defineTheme('brand-dark', DARK_THEME as any);
                monaco.editor.defineTheme('brand-light', LIGHT_THEME as any);
                setThemesLoaded(true);
            } catch (err) {
                console.error('Failed to define Monaco themes:', err);
                setThemesLoaded(true);
            }
        }
    }, [monaco]);

    return {
        isLoading: false, // Monaco handles its own loading
        themesLoaded,
        darkTheme: DARK_THEME,
        lightTheme: LIGHT_THEME,
    };
};

// Re-export for use in App.tsx if needed
export { DARK_THEME, LIGHT_THEME };
