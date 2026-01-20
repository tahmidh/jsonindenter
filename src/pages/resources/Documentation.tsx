import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';
import { ROUTES } from '../../constants/routes';

export const Documentation: React.FC = () => {
    return (
        <>
            <SEO {...getPageSEO('documentation')} />
            <StaticPageLayout
                title="Documentation"
                description="Complete guide to using JSON Indenter Pro tools effectively."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-8">
                    <div>
                        <h2>Getting Started</h2>
                        <p>
                            JSON Indenter Pro is a suite of client-side tools designed for developers to manipulate JSON data securely. No installation is required; everything runs in your browser.
                        </p>
                    </div>

                    <div>
                        <h3>Key Features</h3>
                        <div className="grid sm:grid-cols-2 gap-4 not-prose">
                            <Link to={`${ROUTES.HOME}`} className="block p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-colors group">
                                <h4 className="font-bold text-lg mb-2 group-hover:text-brand-primary">JSON Indenter</h4>
                                <p className="text-sm opacity-80">Format minified JSON into human-readable text with custom indentation (2-space, 3-space,4-space, tabs).</p>
                            </Link>
                            <Link to={`/${ROUTES.VALIDATOR}`} className="block p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-colors group">
                                <h4 className="font-bold text-lg mb-2 group-hover:text-brand-primary">JSON Validator</h4>
                                <p className="text-sm opacity-80">Validate JSON against RFC 8259 standards with real-time error highlighting and linting.</p>
                            </Link>
                            <Link to={`/${ROUTES.MINIFIER}`} className="block p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-colors group">
                                <h4 className="font-bold text-lg mb-2 group-hover:text-brand-primary">JSON Minifier</h4>
                                <p className="text-sm opacity-80">Compress JSON by removing whitespace to reduce file size for API payloads.</p>
                            </Link>
                            <Link to={`/${ROUTES.JSON_TO_CSV}`} className="block p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-colors group">
                                <h4 className="font-bold text-lg mb-2 group-hover:text-brand-primary">Converters (CSV/XML)</h4>
                                <p className="text-sm opacity-80">Transform JSON arrays into CSV for spreadsheets or XML for legacy system integration.</p>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3>How to Use</h3>
                        <ol>
                            <li><strong>Paste Data:</strong> Copy your JSON string into the left-hand editor panel.</li>
                            <li><strong>Auto-Detect:</strong> The tool immediately validates the syntax. If invalid, error lines are highlighted in red.</li>
                            <li><strong>Choose Action:</strong>
                                <ul>
                                    <li>Click <strong>Format</strong> to prettify the code.</li>
                                    <li>Click <strong>Minify</strong> to compress it.</li>
                                </ul>
                            </li>
                            <li><strong>Export:</strong> Use the <strong>Copy</strong> button or <strong>Download</strong> to save your result.</li>
                        </ol>
                    </div>

                    <div>
                        <h3>Keyboard Shortcuts</h3>
                        <p>Boost your productivity with these built-in shortcuts:</p>
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Mac Shortcut</th>
                                    <th>Windows/Linux</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Format Document</td>
                                    <td><code>Cmd + S</code></td>
                                    <td><code>Ctrl + S</code></td>
                                </tr>
                                <tr>
                                    <td>Copy to Clipboard</td>
                                    <td><code>Cmd + C</code></td>
                                    <td><code>Ctrl + C</code></td>
                                </tr>
                                <tr>
                                    <td>Select All</td>
                                    <td><code>Cmd + A</code></td>
                                    <td><code>Ctrl + A</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </StaticPageLayout>
        </>
    );
};
