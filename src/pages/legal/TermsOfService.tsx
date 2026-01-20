import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';

export const TermsOfService: React.FC = () => {
    return (
        <>
            <SEO {...getPageSEO('terms')} />
            <StaticPageLayout
                title="Terms of Service"
                description="The rules and regulations for using JSON Indenter Pro."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-6">
                    <h3>1. Agreement to Terms</h3>
                    <p>
                        By accessing our website at <strong>jsonindenter.com</strong>, you agree to be bound by these Terms of Service and agree that you are responsible for keeping up with any applicable local laws.
                    </p>

                    <h3>2. Use License</h3>
                    <p>
                        Permission is granted to use JSON Indenter Pro for personal, commercial, or educational purposes free of charge. You may:
                    </p>
                    <ul>
                        <li>Format, validate, and minify JSON data.</li>
                        <li>Convert data between formats (CSV, XML).</li>
                        <li>Share links to our tools.</li>
                    </ul>
                    <p>
                        You may <strong>not</strong>:
                    </p>
                    <ul>
                        <li>Attempt to reverse engineer any software contained on our website.</li>
                        <li>Remove any copyright or other proprietary notations from the materials.</li>
                        <li>Mirror the materials on any other server or attempt to clone the service.</li>
                    </ul>

                    <h3>3. Disclaimer</h3>
                    <p>
                        The materials on JSON Indenter Pro's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h3>4. Limitations</h3>
                    <p>
                        In no event shall JSON Indenter Pro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                    </p>

                    <h3>5. Governing Law</h3>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Canada and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
            </StaticPageLayout>
        </>
    );
};
