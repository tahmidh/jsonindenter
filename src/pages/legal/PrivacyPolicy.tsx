import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';

export const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <SEO {...getPageSEO('privacy')} />
            <StaticPageLayout
                title="Privacy Policy"
                description="We believe your data belongs to you. That's why we don't store it."
                lastUpdated="January 11, 2026"
            >
                <section className="space-y-6">
                    <h3>1. Introduction</h3>
                    <p>
                        JSON Indenter Pro ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <strong>jsonindenter.com</strong>.
                    </p>

                    <h3>2. No Data Collection</h3>
                    <p>
                        Our core philosophy is <strong>Privacy First</strong>. Unlike other online tools:
                    </p>
                    <ul>
                        <li>We do <strong>not</strong> store, save, or transmit the JSON data you paste into our editor.</li>
                        <li>All processing (formatting, validating, minifying) happens 100% locally in your browser using JavaScript.</li>
                        <li>Your data never leaves your device.</li>
                    </ul>

                    <h3>3. Cookies and Tracking</h3>
                    <p>
                        We use minimal local storage to enhance your experience:
                    </p>
                    <ul>
                        <li><strong>Local Storage:</strong> We save your preferences (theme, indentation style) locally on your device so they persist between visits.</li>
                        <li><strong>Analytics:</strong> We use Google Analytics 4 (GA4) to collect anonymous usage statistics (e.g., page views, button clicks) to improve our tool. This data is aggregated and does not identify you personally.</li>
                    </ul>

                    <h3>4. Third-Party Services</h3>
                    <p>
                        We may use third-party services for:
                    </p>
                    <ul>
                        <li><strong>Hosting:</strong> Caching and delivery via Cloudflare Pages.</li>
                        <li><strong>Analytics:</strong> Google Analytics.</li>
                    </ul>

                    <h3>5. Changes to This Policy</h3>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@jsonindenter.com">support@jsonindenter.com</a>.
                    </p>
                </section>
            </StaticPageLayout>
        </>
    );
};
