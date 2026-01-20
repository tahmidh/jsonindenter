import React from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

export const SeoContent: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const { pathname } = useLocation();

    // Determine content based on path
    const isValidator = pathname.includes('validator');
    const isMinifier = pathname.includes('minifier');
    const isSchema = pathname.includes('schema');
    const isYaml = pathname.includes('yaml');
    const isToml = pathname.includes('toml');
    const isCsv = pathname.includes('csv');
    const isXml = pathname.includes('xml');
    const isTypeScript = pathname.includes('typescript');

    const getFaqSchema = () => {
        const faqs = [];

        // Base FAQs
        faqs.push({
            "@type": "Question",
            "name": "Is my data safe with this JSON tool?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. This tool uses 100% client-side processing. Your JSON data never leaves your browser and is never sent to our servers, ensuring maximum privacy and security."
            }
        });

        if (isValidator) {
            // ... (existing validator FAQs)
            faqs.push({
                "@type": "Question",
                "name": "What constitutes 'valid' JSON?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Valid JSON follows RFC 8259. This includes double-quoted keys, no trailing commas, and specific formatting for strings, numbers, booleans, and null values."
                }
            });
        } else if (isMinifier) {
            // ... (existing minifier FAQs)
            faqs.push({
                "@type": "Question",
                "name": "How much space does JSON minification save?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Minification typically reduces JSON file size by 20-40% by removing all whitespace and newlines, which is crucial for reducing API latency and bandwidth costs."
                }
            });
        } else if (isSchema) {
            faqs.push({
                "@type": "Question",
                "name": "What is JSON Schema used for?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It's used to define the structure, required fields, and data types expected in a JSON payload, ensuring API contract reliability."
                }
            });
        } else if (isYaml || isToml) {
            faqs.push({
                "@type": "Question",
                "name": `When should I use ${isYaml ? 'YAML' : 'TOML'} instead of JSON?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${isYaml ? 'YAML' : 'TOML'} is often preferred for configuration files because it supports comments and is generally more human-readable than JSON. JSON remains the standard for data interchange APIs.`
                }
            });
        } else {
            // ... (existing indenter FAQs)
            faqs.push({
                "@type": "Question",
                "name": "What is the standard JSON indentation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Standard practice usually favors 2 spaces for web-based APIs, while 4 spaces are used for better readability in configuration files. Our tool supports both, plus tabs."
                }
            });
        }

        // ... (rest of function)
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs
        };
    };

    return (
        <section className={`px-4 md:px-8 py-16 border-t ${isDarkMode ? 'bg-brand-background-dark border-brand-border-dark text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
            <script type="application/ld+json">
                {JSON.stringify(getFaqSchema())}
            </script>

            <div className="max-w-6xl mx-auto space-y-16">
                {/* Dynamic Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {isValidator ? (
                        // ... (existing validator content)
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Precision JSON Validation
                                </h2>
                                <p className="leading-relaxed">
                                    Our <strong>JSON Validator</strong> ensures your data complies perfectly with JSON standards (RFC 8259). It catches the most common developer mistakes instantly.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Missing Quotes:</strong> Identifies unquoted or single-quoted keys.</li>
                                    <li><strong>Trailing Commas:</strong> Flags commas at the end of objects or arrays.</li>
                                    <li><strong>Structural Integrity:</strong> Checks for mismatched braces and brackets.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Real-time Linting
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    Unlike basic validators, JSON Indenter Pro features an integrated linter that provides line-by-line feedback as you type, making it the best tool for debugging complex data structures.
                                </p>
                            </div>
                        </>
                    ) : isMinifier ? (
                        // ... (existing minifier content)
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    API Performance Optimization
                                </h2>
                                <p className="leading-relaxed">
                                    <strong>JSON Minification</strong> is the process of removing unnecessary characters (whitespace, tabs, newlines) from your JSON to reduce its payload size.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Reduced Latency:</strong> Smaller files mean faster data transfer over the network.</li>
                                    <li><strong>Cost Savings:</strong> Lower bandwidth usage for high-traffic microservices.</li>
                                    <li><strong>Production Ready:</strong> Always minify your JSON before deploying to a production API.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Instant Compression
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    Compress any JSON string to its absolute minimum size with a single click while maintaining 100% data integrity and structural accuracy.
                                </p>
                            </div>
                        </>
                    ) : isSchema ? (
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    JSON Schema Generator
                                </h2>
                                <p className="leading-relaxed">
                                    Instantly generate a <strong>JSON Schema</strong> (Draft-07) from any JSON object. Essential for defining API contracts and ensuring data consistency.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Type Inference:</strong> Automatically detects strings, numbers, arrays, and objects.</li>
                                    <li><strong>Required Fields:</strong> Generates strict validation rules by default.</li>
                                    <li><strong>Draft-07 Compliant:</strong> Produces standard schemas compatible with most validators.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Automate Your API Contracts
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    Stop writing schemas by hand. Paste your example response, and let our tool build the blueprint for your API documentation or validation layer in milliseconds.
                                </p>
                            </div>
                        </>
                    ) : isYaml ? (
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    JSON to YAML Conversion
                                </h2>
                                <p className="leading-relaxed">
                                    Convert complex <strong>JSON to YAML</strong> for configuration files, Kubernetes manifests, or CI/CD pipelines.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Human Readable:</strong> YAML is cleaner and easier to read than JSON.</li>
                                    <li><strong>Configuration Ready:</strong> Perfect for converting API responses into config files.</li>
                                    <li><strong>Syntax Highlighting:</strong> Clear visualization of your output YAML structure.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Why Convert to YAML?
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    YAML is the standard for DevOps tools like Docker Compose, Kubernetes, and Ansible. Our tool ensures your JSON is correctly translated into valid, error-free YAML.
                                </p>
                            </div>
                        </>
                    ) : isToml ? (
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    JSON to TOML Conversion
                                </h2>
                                <p className="leading-relaxed">
                                    Transform <strong>JSON to TOML</strong> for modern application configuration. Ideal for Rust projects (Cargo.toml) or Python tools (pyproject.toml).
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Configuration Standard:</strong> TOML is designed to be minimal and easy to parse.</li>
                                    <li><strong>Type Safety:</strong> Preserves data types accurately during conversion.</li>
                                    <li><strong>Instant Result:</strong> Get your TOML configuration in seconds.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Modern Config Management
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    As TOML gains popularity in the developer ecosystem, our converter helps you migrate legacy JSON configurations to the new standard effortlessly.
                                </p>
                            </div>
                        </>
                    ) : isCsv ? (
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    JSON to CSV Converter
                                </h2>
                                <p className="leading-relaxed">
                                    Convert <strong>JSON to CSV</strong> for seamless spreadsheet import. Perfect for exporting API responses, user data, and analytics to Excel or Google Sheets.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Excel Compatible:</strong> Generate properly formatted CSV files that open in Excel, Google Sheets, and other spreadsheet applications.</li>
                                    <li><strong>Smart Headers:</strong> Automatically extracts column names from JSON keys.</li>
                                    <li><strong>Nested Support:</strong> Handles complex JSON structures by flattening nested objects intelligently.</li>
                                    <li><strong>Array Handling:</strong> Converts JSON arrays directly into spreadsheet rows.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Export & Share Data Instantly
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    Whether you're a business analyst exporting database records or a developer integrating with legacy systems, our JSON to CSV tool eliminates manual data transformation workflows.
                                </p>
                            </div>
                        </>
                    ) : isXml ? (
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    JSON to XML Conversion
                                </h2>
                                <p className="leading-relaxed">
                                    Transform <strong>JSON to XML</strong> for integration with SOAP services, enterprise systems, and legacy applications.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>SOAP Ready:</strong> Generate properly structured XML for web service integration.</li>
                                    <li><strong>Schema Compliant:</strong> Produces valid XML that passes standard validators.</li>
                                    <li><strong>Data Integrity:</strong> Preserves all data types and nested structures.</li>
                                    <li><strong>Legacy System Compatible:</strong> Perfect for modernizing old system integrations.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Enterprise Data Exchange
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    Bridge the gap between modern APIs (JSON) and legacy enterprise systems (XML) with our reliable conversion tool.
                                </p>
                            </div>
                        </>
                    ) : isTypeScript ? (
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    JSON to TypeScript Interfaces
                                </h2>
                                <p className="leading-relaxed">
                                    Generate <strong>TypeScript interfaces automatically</strong> from JSON objects. Save hours of manual type definition with intelligent type inference.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Type Safety:</strong> Eliminates TypeScript errors by creating precise interface definitions.</li>
                                    <li><strong>Nested Support:</strong> Recursively generates interfaces for deeply nested objects and arrays.</li>
                                    <li><strong>Custom Naming:</strong> Customize root interface name or use defaults.</li>
                                    <li><strong>Production Ready:</strong> Instantly copy generated interfaces directly into your codebase.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    TypeScript Development Accelerator
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    Whether you're consuming an API response, working with Firebase data, or handling form submissions, our tool generates bulletproof TypeScript types from your JSON examples.
                                </p>
                            </div>
                        </>
                    ) : (
                        // ... (existing indenter content)
                        <>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    What is a JSON Indenter?
                                </h2>
                                <p className="leading-relaxed">
                                    A <strong>JSON Indenter</strong> (also known as a JSON Formatter) is a tool that converts minified, compressed JSON strings into a structured, human-readable format.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                                    <li><strong>Readability:</strong> Makes complex nested objects easy to visualize.</li>
                                    <li><strong>Organization:</strong> Standardizes indentation across your team.</li>
                                    <li><strong>Fast Inspection:</strong> Perfect for checking logs or API responses quickly.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Professional Grade Formatting
                                </h2>
                                <p className="leading-relaxed text-sm">
                                    JSON Indenter Pro provides more than just pretty printing. With support for 2-space, 3-space, 4-space, and tab indentation, it caters to any company's style guide instantly.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <hr className={isDarkMode ? 'border-slate-800' : 'border-slate-100'} />

                {/* FAQ Section */}
                <div className={`p-8 md:p-12 rounded-3xl ${isDarkMode ? 'bg-slate-900/40 border border-slate-800' : 'bg-slate-50/50 border border-slate-100'}`}>
                    <h2 className={`text-2xl font-bold mb-10 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10 text-sm">
                        <div className="space-y-3">
                            <h4 className="font-bold text-brand-primary">Is my data secure?</h4>
                            <p className="opacity-80 leading-relaxed italic">Absolutely. Our tool operates strictly <strong>client-side</strong>. Your JSON data is never transmitted to any server.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-brand-primary">Which indent is best?</h4>
                            <p className="opacity-80 leading-relaxed italic">Most modern web projects use <strong>2 spaces</strong> to balance readability and compactness in files.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-brand-primary">Handle large files?</h4>
                            <p className="opacity-80 leading-relaxed italic">Yes, our high-performance editor can handle multi-megabyte JSON strings with zero lag.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

