import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 3000,
        },
        watch: {
            usePolling: false,
            ignored: ['**/node_modules/**', '**/.git/**'],
        }
    },
    build: {
        target: 'esnext',
        minify: 'terser',
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true, // Enable CSS code splitting
        reportCompressedSize: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split Monaco Editor into its own chunk (it's large)
                    'monaco-editor': ['@monaco-editor/react', 'monaco-editor'],
                    // Split React and related libraries
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    // Split other vendor libraries
                    'vendor': ['zustand', 'lucide-react', 'react-ga4']
                }
            }
        }
    }
});
