import { ROUTES } from '../constants/routes';

export interface Breadcrumb {
    name: string;
    url: string;
}

export interface WhatsNextLink {
    title: string;
    description: string;
    href: string;
    iconName: string;
}

export interface PageEnhancement {
    breadcrumbs: Breadcrumb[];
    inlineTip: string;
    whatsNextLinks: WhatsNextLink[];
}

export const pageEnhancements: Record<string, PageEnhancement> = {
    indenter: {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON Indenter', url: ROUTES.HOME },
        ],
        inlineTip:
            'Paste messy JSON and press Ctrl+S to instantly format with your preferred indentation style.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Check syntax after formatting',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON Minifier',
                description: 'Compress for deployment',
                href: `/${ROUTES.MINIFIER}`,
                iconName: 'Minimize2',
            },
            {
                title: 'Tree View Mode',
                description: 'Visualize JSON structure',
                href: `${ROUTES.HOME}?view=tree`,
                iconName: 'GitBranch',
            },
            {
                title: 'JSON Structure Guide',
                description: 'Learn JSON basics',
                href: `/${ROUTES.JSON_GUIDE}`,
                iconName: 'BookOpen',
            },
            {
                title: 'What is JSON?',
                description: 'Beginner guide',
                href: `/${ROUTES.BLOG}/what-is-json`,
                iconName: 'FileText',
            },
            {
                title: '5 Common JSON Errors',
                description: 'Error prevention tips',
                href: `/${ROUTES.BLOG}/5-common-json-errors`,
                iconName: 'FileText',
            },
        ],
    },
    validator: {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON Validator', url: `/${ROUTES.VALIDATOR}` },
        ],
        inlineTip:
            'Common errors: Missing quotes around keys, trailing commas, or unescaped characters in strings.',
        whatsNextLinks: [
            {
                title: 'JSON Indenter',
                description: 'Format your validated JSON',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'JSON Minifier',
                description: 'Compress valid JSON for production',
                href: `/${ROUTES.MINIFIER}`,
                iconName: 'Minimize2',
            },
            {
                title: 'JSON to Schema',
                description: 'Generate validation schema',
                href: `/${ROUTES.JSON_TO_SCHEMA}`,
                iconName: 'FileCode',
            },
            {
                title: 'Documentation',
                description: 'Learn JSON syntax rules',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: '5 Common JSON Errors',
                description: 'Avoid these mistakes',
                href: `/${ROUTES.BLOG}/5-common-json-errors`,
                iconName: 'FileText',
            },
            {
                title: 'JSON Validator Guide',
                description: 'Validation best practices',
                href: `/${ROUTES.BLOG}/json-validator-guide`,
                iconName: 'FileText',
            },
        ],
    },
    minifier: {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON Minifier', url: `/${ROUTES.MINIFIER}` },
        ],
        inlineTip:
            'Minification removes all whitespace - perfect for production APIs to reduce bandwidth by 20-40%.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Validate before minifying',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON Indenter',
                description: 'Format minified JSON back',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'JSON to CSV',
                description: 'Export compressed data',
                href: `/${ROUTES.JSON_TO_CSV}`,
                iconName: 'ArrowRight',
            },
            {
                title: 'Documentation',
                description: 'API optimization guide',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: 'JSON vs XML',
                description: 'Performance comparison',
                href: `/${ROUTES.BLOG}/json-vs-xml`,
                iconName: 'FileText',
            },
            {
                title: 'API Reference',
                description: 'Integration examples',
                href: `/${ROUTES.API}`,
                iconName: 'BookOpen',
            },
        ],
    },
    'schema-generator': {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'Schema Generator', url: `/${ROUTES.JSON_TO_SCHEMA}` },
        ],
        inlineTip:
            'Use generated schemas with libraries like Ajv or Joi to validate API requests automatically.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Validate your input first',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON to TypeScript',
                description: 'Generate type definitions',
                href: `/${ROUTES.JSON_TO_TYPESCRIPT}`,
                iconName: 'ArrowRight',
            },
            {
                title: 'API Reference',
                description: 'Use schemas in your API',
                href: `/${ROUTES.API}`,
                iconName: 'BookOpen',
            },
            {
                title: 'Documentation',
                description: 'Schema validation guide',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: 'JSON Schema Validation',
                description: 'Understanding schemas',
                href: `/${ROUTES.BLOG}/understanding-json-schema-validation`,
                iconName: 'FileText',
            },
            {
                title: 'JSON Indenter',
                description: 'Format schema output',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
        ],
    },
    'json-to-yaml': {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON to YAML', url: `/${ROUTES.JSON_TO_YAML}` },
        ],
        inlineTip:
            'YAML is perfect for Kubernetes configs and Docker Compose - supports comments unlike JSON.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Validate JSON before converting',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON to TOML',
                description: 'Alternative config format',
                href: `/${ROUTES.JSON_TO_TOML}`,
                iconName: 'ArrowRight',
            },
            {
                title: 'JSON Indenter',
                description: 'Format input JSON',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'JSON Structure Guide',
                description: 'YAML vs JSON comparison',
                href: `/${ROUTES.JSON_GUIDE}`,
                iconName: 'BookOpen',
            },
            {
                title: 'JSON vs XML',
                description: 'Format comparisons',
                href: `/${ROUTES.BLOG}/json-vs-xml`,
                iconName: 'FileText',
            },
            {
                title: 'Documentation',
                description: 'Configuration best practices',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
        ],
    },
    'json-to-typescript': {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON to TypeScript', url: `/${ROUTES.JSON_TO_TYPESCRIPT}` },
        ],
        inlineTip:
            'Paste an API response to instantly generate TypeScript interfaces for type-safe development.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Ensure valid input',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON to Schema',
                description: 'Generate validation rules',
                href: `/${ROUTES.JSON_TO_SCHEMA}`,
                iconName: 'FileCode',
            },
            {
                title: 'API Reference',
                description: 'Type-safe API integration',
                href: `/${ROUTES.API}`,
                iconName: 'BookOpen',
            },
            {
                title: 'Documentation',
                description: 'TypeScript integration guide',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: 'JSON Indenter',
                description: 'Format API responses',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'Client-Side Parsing',
                description: 'Security practices',
                href: `/${ROUTES.BLOG}/why-client-side-parsing-matters`,
                iconName: 'FileText',
            },
        ],
    },
    'json-to-toml': {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON to TOML', url: `/${ROUTES.JSON_TO_TOML}` },
        ],
        inlineTip:
            "TOML is the standard for Rust's Cargo.toml and Python's pyproject.toml configuration files.",
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Validate input first',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON to YAML',
                description: 'Alternative format',
                href: `/${ROUTES.JSON_TO_YAML}`,
                iconName: 'ArrowRight',
            },
            {
                title: 'JSON Indenter',
                description: 'Format configuration',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'Documentation',
                description: 'Rust/Python configs',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: 'What is JSON?',
                description: 'Format basics',
                href: `/${ROUTES.BLOG}/what-is-json`,
                iconName: 'FileText',
            },
            {
                title: 'JSON Structure Guide',
                description: 'Config file patterns',
                href: `/${ROUTES.JSON_GUIDE}`,
                iconName: 'BookOpen',
            },
        ],
    },
    'json-to-csv': {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON to CSV', url: `/${ROUTES.JSON_TO_CSV}` },
        ],
        inlineTip:
            'Your JSON must be an array of objects for CSV conversion - each object becomes a row.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Validate array structure',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON Indenter',
                description: 'Format for readability',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'JSON to XML',
                description: 'Alternative export format',
                href: `/${ROUTES.JSON_TO_XML}`,
                iconName: 'ArrowRight',
            },
            {
                title: 'Documentation',
                description: 'Data export guide',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: 'What is JSON?',
                description: 'Data types explained',
                href: `/${ROUTES.BLOG}/what-is-json`,
                iconName: 'FileText',
            },
            {
                title: 'JSON Structure Guide',
                description: 'Working with arrays',
                href: `/${ROUTES.JSON_GUIDE}`,
                iconName: 'BookOpen',
            },
        ],
    },
    'json-to-xml': {
        breadcrumbs: [
            { name: 'Home', url: ROUTES.HOME },
            { name: 'JSON to XML', url: `/${ROUTES.JSON_TO_XML}` },
        ],
        inlineTip:
            'Useful for SOAP APIs and legacy enterprise systems that require XML format.',
        whatsNextLinks: [
            {
                title: 'JSON Validator',
                description: 'Check JSON syntax',
                href: `/${ROUTES.VALIDATOR}`,
                iconName: 'CheckCircle',
            },
            {
                title: 'JSON to CSV',
                description: 'Tabular data export',
                href: `/${ROUTES.JSON_TO_CSV}`,
                iconName: 'ArrowRight',
            },
            {
                title: 'JSON Indenter',
                description: 'Format before converting',
                href: ROUTES.HOME,
                iconName: 'Wrench',
            },
            {
                title: 'Documentation',
                description: 'Legacy system integration',
                href: `/${ROUTES.DOCS}`,
                iconName: 'BookOpen',
            },
            {
                title: 'JSON vs XML',
                description: 'Format comparison',
                href: `/${ROUTES.BLOG}/json-vs-xml`,
                iconName: 'FileText',
            },
            {
                title: 'API Reference',
                description: 'SOAP integration',
                href: `/${ROUTES.API}`,
                iconName: 'BookOpen',
            },
        ],
    },
};
