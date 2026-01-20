import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';
import { useThemeStore } from '../../store/themeStore';

export const JsonStructureGuide: React.FC = () => {
    const { isDarkMode } = useThemeStore();

    return (
        <>
            <SEO {...getPageSEO('json-structure-guide')} />
            <StaticPageLayout
                title="JSON Structure Guide"
                description="A comprehensive reference for the JavaScript Object Notation (JSON) format."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-8">
                    <div>
                        <h3>What is JSON?</h3>
                        <p>
                            JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write, and strictly follows the <a href="https://tools.ietf.org/html/rfc8259" target="_blank" rel="nofollow noreferrer">RFC 8259</a> standard.
                        </p>
                    </div>

                    <div>
                        <h3>Data Types</h3>
                        <p>JSON supports the following native data types:</p>
                        <ul>
                            <li><strong>String:</strong> A sequence of characters enclosed in double quotes (e.g., <code>"Hello"</code>).</li>
                            <li><strong>Number:</strong> Integer or floating-point (e.g., <code>42</code>, <code>3.14</code>).</li>
                            <li><strong>Boolean:</strong> <code>true</code> or <code>false</code>.</li>
                            <li><strong>Null:</strong> Represents an empty value (<code>null</code>).</li>
                            <li><strong>Array:</strong> An ordered list of values enclosed in square brackets (<code>[]</code>).</li>
                            <li><strong>Object:</strong> A collection of key/value pairs enclosed in curly braces (<code>{ }</code>).</li>
                        </ul>
                    </div>

                    <div>
                        <h3>Syntax Rules</h3>
                        <div className={`p-6 rounded-xl font-mono text-sm overflow-x-auto border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                            {`{
  "string": "Keys must be double-quoted strings",
  "number": 123,
  "boolean": true,
  "null_value": null,
  "array": [
    "No trailing commas are allowed in the last item",
    2
  ],
  "object": {
    "nested": "structures work fine"
  }
}`}
                        </div>
                        <p className="text-sm mt-4 text-slate-500">
                            <em>Tip: JavaScript allows single quotes and trailing commas, but strict JSON does not. Our validator helps you catch these common errors.</em>
                        </p>
                    </div>
                </section>
            </StaticPageLayout>
        </>
    );
};
