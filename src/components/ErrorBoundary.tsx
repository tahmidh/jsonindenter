import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="flex items-center justify-center w-full h-full bg-red-500/10 border border-red-500/30 rounded p-4">
                        <div className="text-center">
                            <p className="text-red-600 font-semibold mb-2">Something went wrong</p>
                            <p className="text-red-500 text-sm">{this.state.error?.message}</p>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
