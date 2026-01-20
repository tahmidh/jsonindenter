/**
 * Centralized SEO configuration for all pages
 */

import { getCanonicalUrl, getOGImageUrl, generateSoftwareApplicationSchema, generateBreadcrumbSchema, SITE_BASE_URL } from '../utils/seo';
import { ROUTES } from '../constants/routes';

export interface PageSEO {
    title: string;
    description: string;
    canonical: string;
    keywords: string;
    image: string;
    schema?: object | object[];
    noindex?: boolean;
}

type PageKey =
    | 'home'
    | 'validator'
    | 'minifier'
    | 'schema'
    | 'json-to-yaml'
    | 'json-to-typescript'
    | 'json-to-toml'
    | 'json-to-csv'
    | 'json-to-xml'
    | 'privacy'
    | 'terms'
    | 'cookies'
    | 'security'
    | 'documentation'
    | 'api-reference'
    | 'json-structure-guide'
    | 'json-performance-optimization'
    | 'working-with-nested-json-structures'
    | 'blog';

const seoConfig: Record<PageKey, PageSEO> = {
    home: {
        title: 'JSON Indenter Pro - Instant & Secure JSON Formatter Online',
        description:
            'Free JSON formatter with 2-space, 4-space, tab indentation. 100% client-side processing—secure, private, ad-free. Format JSON instantly in your browser.',
        canonical: getCanonicalUrl('/'),
        keywords:
            'json indenter, json formatter, json beautifier, pretty print json, format json online, json tool, json editor',
        image: getOGImageUrl('indenter.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON Indenter Pro',
                'Professional JSON formatting and beautification tool with customizable indentation options'
            ),
            generateBreadcrumbSchema([{ name: 'Home', url: SITE_BASE_URL }]),
        ],
    },
    validator: {
        title: 'JSON Validator Pro - Secure Online JSON Lint & Syntax Checker',
        description:
            'Validate JSON syntax instantly with detailed error messages and line numbers. Client-side validation for maximum security and privacy.',
        canonical: getCanonicalUrl(`/${ROUTES.VALIDATOR}`),
        keywords:
            'json validator, json lint, validate json, json syntax checker, check json, json error, json linter',
        image: getOGImageUrl('validator.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON Validator Pro',
                'Professional JSON validation tool with detailed error reporting and syntax checking'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'Validator', url: `${SITE_BASE_URL}/${ROUTES.VALIDATOR}` },
            ]),
        ],
    },
    minifier: {
        title: 'JSON Minifier Pro - One-Click JSON Compressor & Size Reducer',
        description:
            'Minify JSON to reduce file size 20-40%. Optimize for APIs, bandwidth, and production. Fast client-side compression—instant results, no uploads.',
        canonical: getCanonicalUrl(`/${ROUTES.MINIFIER}`),
        keywords:
            'json minifier, json compressor, minify json, compress json, reduce json size, json optimizer, json compression',
        image: getOGImageUrl('minifier.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON Minifier Pro',
                'Professional JSON minification tool to compress and optimize JSON data for production'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'Minifier', url: `${SITE_BASE_URL}/${ROUTES.MINIFIER}` },
            ]),
        ],
    },
    schema: {
        title: 'JSON to Schema Generator - Auto-Generate JSON Schema Online',
        description:
            'Auto-generate JSON Schema from sample JSON data. Perfect for API validation, contract testing, and OpenAPI specifications. Supports Draft 7 with type inference.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_TO_SCHEMA}`),
        keywords:
            'json schema, json schema generator, generate json schema, json to schema, api validation, json schema online',
        image: getOGImageUrl('schema-generator.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON to Schema Generator',
                'Professional tool to generate JSON Schema from sample data for API validation and documentation'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'JSON to Schema', url: `${SITE_BASE_URL}/${ROUTES.JSON_TO_SCHEMA}` },
            ]),
        ],
    },
    'json-to-yaml': {
        title: 'JSON to YAML Converter - Instant & Secure Conversion Online',
        description:
            'Convert JSON to YAML for Kubernetes and Docker configs. Supports comments and proper indentation. 100% client-side processing.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_TO_YAML}`),
        keywords:
            'json to yaml, json yaml converter, convert json to yaml, json to yml, yaml converter, kubernetes config',
        image: getOGImageUrl('json-to-yaml.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON to YAML Converter',
                'Professional JSON to YAML conversion tool for configuration files and cloud infrastructure'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'JSON to YAML', url: `${SITE_BASE_URL}/${ROUTES.JSON_TO_YAML}` },
            ]),
        ],
    },
    'json-to-typescript': {
        title: 'JSON to TypeScript Interfaces - Instant Type Generator Online',
        description:
            'Generate TypeScript interfaces from JSON automatically. Perfect for type-safe development and API integration with nested support.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_TO_TYPESCRIPT}`),
        keywords:
            'json to typescript, typescript interface generator, json to ts, generate typescript types, typescript converter',
        image: getOGImageUrl('json-to-typescript.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON to TypeScript Converter',
                'Professional tool to generate TypeScript interfaces from JSON for type-safe development'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'JSON to TypeScript', url: `${SITE_BASE_URL}/${ROUTES.JSON_TO_TYPESCRIPT}` },
            ]),
        ],
    },
    'json-to-toml': {
        title: 'JSON to TOML Converter - Fast Configuration File Conversion',
        description:
            'Convert JSON to TOML for Rust & Python config files. Human-readable output with proper TOML syntax. Fast client-side JSON to TOML conversion.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_TO_TOML}`),
        keywords:
            'json to toml, toml converter, convert json to toml, rust config, toml format, cargo config',
        image: getOGImageUrl('json-to-toml.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON to TOML Converter',
                'Professional JSON to TOML conversion tool for Rust and configuration file management'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'JSON to TOML', url: `${SITE_BASE_URL}/${ROUTES.JSON_TO_TOML}` },
            ]),
        ],
    },
    'json-to-csv': {
        title: 'JSON to CSV Converter - Instant & Secure Conversion to CSV Online',
        description:
            'Convert JSON to CSV for Excel & Google Sheets. Handles arrays, nested objects, custom delimiters. Free instant JSON to CSV converter—no uploads.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_TO_CSV}`),
        keywords:
            'json to csv, json csv converter, convert json to csv, json to excel, csv export, json array to csv',
        image: getOGImageUrl('json-to-csv.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON to CSV Converter',
                'Professional JSON to CSV conversion tool for data export and spreadsheet integration'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'JSON to CSV', url: `${SITE_BASE_URL}/${ROUTES.JSON_TO_CSV}` },
            ]),
        ],
    },
    'json-to-xml': {
        title: 'JSON to XML Converter - Instant & Secure Transformation Online',
        description:
            'Transform JSON to XML format for legacy systems, SOAP APIs, and enterprise integration. Supports custom root elements, attributes, and proper XML formatting.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_TO_XML}`),
        keywords:
            'json to xml, xml converter, convert json to xml, json xml transformer, soap api, xml format',
        image: getOGImageUrl('json-to-xml.png'),
        schema: [
            generateSoftwareApplicationSchema(
                'JSON to XML Converter',
                'Professional JSON to XML transformation tool for legacy systems and SOAP API integration'
            ),
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'JSON to XML', url: `${SITE_BASE_URL}/${ROUTES.JSON_TO_XML}` },
            ]),
        ],
    },
    privacy: {
        title: 'Privacy Policy - JSON Indenter Pro',
        description:
            'Privacy-first JSON formatter. 100% client-side processing—no data collection, cookies, or tracking. Your JSON data stays in your browser.',
        canonical: getCanonicalUrl(`/${ROUTES.PRIVACY}`),
        keywords: 'privacy policy, data protection, privacy, json indenter privacy',
        image: getOGImageUrl('indenter.png'), // Use default OG image
        noindex: false, // Index legal pages for trust signals
    },
    terms: {
        title: 'Terms of Service - JSON Indenter Pro',
        description:
            'Terms of service for using JSON Indenter Pro. Free online JSON formatting, validation, and conversion tools with no registration required.',
        canonical: getCanonicalUrl(`/${ROUTES.TERMS}`),
        keywords: 'terms of service, terms and conditions, legal, json indenter terms',
        image: getOGImageUrl('indenter.png'),
        noindex: false,
    },
    cookies: {
        title: 'Cookie Policy - JSON Indenter Pro',
        description:
            'JSON Indenter Pro cookie policy. We use minimal cookies for analytics and functionality. Your JSON data is never stored or transmitted.',
        canonical: getCanonicalUrl(`/${ROUTES.COOKIES}`),
        keywords: 'cookie policy, cookies, privacy, json indenter cookies',
        image: getOGImageUrl('indenter.png'),
        noindex: false,
    },
    security: {
        title: 'Security - JSON Indenter Pro',
        description:
            'Security measures and best practices for JSON Indenter Pro. All processing happens client-side in your browser. Zero data transmission to servers.',
        canonical: getCanonicalUrl(`/${ROUTES.SECURITY}`),
        keywords: 'security, data security, client-side processing, secure json tool',
        image: getOGImageUrl('indenter.png'),
        noindex: false,
    },
    documentation: {
        title: 'Documentation - JSON Indenter Pro User Guide',
        description:
            'Complete documentation for JSON Indenter Pro tools. Learn how to format, validate, minify, and convert JSON with our comprehensive user guide.',
        canonical: getCanonicalUrl(`/${ROUTES.DOCS}`),
        keywords:
            'json documentation, json guide, json help, json tutorial, how to format json',
        image: getOGImageUrl('indenter.png'),
    },
    'api-reference': {
        title: 'API Reference - JSON Indenter Pro Integration Guide',
        description:
            'API reference and integration guide for JSON Indenter Pro. Learn about JSON standards, best practices, and programmatic usage patterns.',
        canonical: getCanonicalUrl(`/${ROUTES.API}`),
        keywords: 'json api, api reference, json standards, json best practices, json integration',
        image: getOGImageUrl('indenter.png'),
    },
    'json-structure-guide': {
        title: 'JSON Structure Guide - Understanding JSON Format & Syntax',
        description:
            'Complete guide to JSON structure, syntax, and data types. Learn objects, arrays, strings, numbers, booleans, and null values with examples.',
        canonical: getCanonicalUrl(`/${ROUTES.JSON_GUIDE}`),
        keywords:
            'json structure, json syntax, json format, json data types, json tutorial, learn json',
        image: getOGImageUrl('indenter.png'),
    },
    'json-performance-optimization': {
        title: 'JSON Performance Optimization: Handling Large Files Efficiently - JSON Blog | JSON Indenter Pro',
        description: 'Learn proven techniques to optimize JSON parsing and transmission. Discover compression strategies, streaming methods, and best practices for handling large ...',
        canonical: getCanonicalUrl(`/${ROUTES.BLOG_JSON_PERFORMANCE_OPTIMIZATION}`),
        keywords: 'json performance, optimization, large files, parsing, bandwidth',
        image: getOGImageUrl('indenter.png'),
        schema: [
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'Blog', url: `${SITE_BASE_URL}/${ROUTES.BLOG}` },
                { name: 'JSON Performance Optimization: Handling Large Files Efficiently', url: `${SITE_BASE_URL}/${ROUTES.BLOG_JSON_PERFORMANCE_OPTIMIZATION}` },
            ]),
        ],
    },
    'working-with-nested-json-structures': {
        title: 'Working with Nested JSON: Mastering Complex Data Structures - JSON Blog | JSON Indenter Pro',
        description: 'Master techniques for working with deeply nested JSON structures. Learn how to navigate, transform, and validate complex hierarchical data in your applications.',
        canonical: getCanonicalUrl(`/${ROUTES.BLOG_WORKING_WITH_NESTED_JSON_STRUCTURES}`),
        keywords: 'nested json, data structures, complex json, json parsing, deep objects',
        image: getOGImageUrl('indenter.png'),
        schema: [
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'Blog', url: `${SITE_BASE_URL}/${ROUTES.BLOG}` },
                { name: 'Working with Nested JSON: Mastering Complex Data Structures', url: `${SITE_BASE_URL}/${ROUTES.BLOG_WORKING_WITH_NESTED_JSON_STRUCTURES}` },
            ]),
        ],
    },
    blog: {
        title: 'JSON Blog - Tips, Tutorials & Best Practices',
        description:
            'Expert tips, tutorials, and best practices for working with JSON. Learn formatting techniques, validation strategies, and data transformation methods.',
        canonical: getCanonicalUrl(`/${ROUTES.BLOG}`),
        keywords:
            'json blog, json tips, json tutorials, json best practices, json articles, json resources',
        image: getOGImageUrl('indenter.png'),
    },
};

/**
 * Get SEO configuration for a specific page
 */
export const getPageSEO = (page: PageKey): PageSEO => {
    return seoConfig[page];
};

/**
 * Get SEO configuration for blog posts (dynamic content)
 */
export const getBlogPostSEO = (
    title: string,
    description: string,
    slug: string
): PageSEO => {
    const url = getCanonicalUrl(`/${ROUTES.BLOG}/${slug}`);
    const publishDate = new Date().toISOString();

    // Keywords specific to the blog post
    const keywordMap: Record<string, string> = {
        '5-common-json-errors': 'json errors, json syntax, trailing commas, json validation, json fixes',
        'what-is-json': 'what is json, json tutorial, javascript object notation, json basics, learn json',
        'json-vs-xml': 'json vs xml, json xml comparison, data format comparison, json advantages',
        'understanding-json-schema-validation': 'json schema, schema validation, json validation, api validation',
        'why-client-side-parsing-matters': 'client-side parsing, json security, data privacy, secure json processing',
        'python-json-indent': 'python json, json formatting python, json pretty print, python indentation',
        'json-validator-guide': 'json validator, json validation, syntax checking, validate json online',
    };

    const keywords = keywordMap[slug] || 'json, tutorial, guide, best practices, tips';

    return {
        title: `${title} - JSON Indenter Pro Blog`,
        description,
        canonical: url,
        keywords,
        image: getOGImageUrl('indenter.png'),
        schema: [
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'Blog', url: `${SITE_BASE_URL}/${ROUTES.BLOG}` },
                { name: title, url },
            ]),
            {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: title,
                description,
                image: getOGImageUrl('indenter.png'),
                datePublished: publishDate,
                dateModified: publishDate,
                author: {
                    '@type': 'Organization',
                    name: 'JSON Indenter Pro',
                    url: SITE_BASE_URL,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'JSON Indenter Pro',
                    logo: {
                        '@type': 'ImageObject',
                        url: `${SITE_BASE_URL}/og/indenter.png`,
                        width: 1200,
                        height: 630,
                    },
                },
            },
        ],
    };
};
