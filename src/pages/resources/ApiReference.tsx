import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';
import { useThemeStore } from '../../store/themeStore';

export const ApiReference: React.FC = () => {
    const { isDarkMode } = useThemeStore();

    return (
        <>
            <SEO {...getPageSEO('api-reference')} />
            <StaticPageLayout
                title="API Reference"
                description="Information regarding programmatic access to JSON Indenter services."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-6">
                    <div className={`p-4 border-l-4 border-amber-500 mb-8 rounded-r ${isDarkMode ? 'bg-amber-900/20 text-amber-200' : 'bg-amber-50 text-amber-800'}`}>
                        <strong>Note:</strong> JSON Indenter Pro is currently a 100% client-side application. We do not expose a public REST API at this time.
                    </div>

                    <h3>Why No Public API?</h3>
                    <p>
                        Our tool is architected for privacy and speed. By running entirely in the browser, we avoid sending your sensitive JSON data across the wire. This architecture currently precludes a server-side API.
                    </p>

                    <h3>Future Plans</h3>
                    <p>
                        We are exploring a <strong>wasm (WebAssembly)</strong> based SDK that would allow developers to embed our formatting engine into their own web apps without making network requests.
                    </p>

                    <h3>Integration Guide</h3>
                    <p>
                        If you wish to link to our tool from your application, you may use the following URL parameters to pre-fill the editor (coming soon):
                    </p>
                    <pre>
                        <code>https://jsonindenter.com/?data=%7B%22hello%22%3A%22world%22%7D</code>
                    </pre>
                </section>
            </StaticPageLayout>
        </>
    );
};
