/**
 * Application route paths as constants
 * Update these constants to change routes everywhere they're used
 */

// Tool pages
export const ROUTES = {
    HOME: '/',
    VALIDATOR: 'json-validator',
    MINIFIER: 'json-minifier',
    JSON_TO_CSV: 'json-to-csv',
    JSON_TO_XML: 'json-to-xml',
    JSON_TO_SCHEMA: 'json-to-schema',
    JSON_TO_YAML: 'json-to-yaml',
    JSON_TO_TOML: 'json-to-toml',
    JSON_TO_TYPESCRIPT: 'json-to-typescript',

    // Resources
    DOCS: 'documentation',
    API: 'api-reference',
    JSON_GUIDE: 'json-structure-guide',
    BLOG: 'blog',
    BLOG_POST: 'blog/:slug',

    // Blog Posts
    BLOG_CLIENT_SIDE_PARSING: 'blog/why-client-side-parsing-matters',
    BLOG_JSON_SCHEMA: 'blog/understanding-json-schema-validation',
    BLOG_COMMON_ERRORS: 'blog/5-common-json-errors',
    BLOG_WHAT_IS_JSON: 'blog/what-is-json',
    BLOG_JSON_VS_XML: 'blog/json-vs-xml',
    BLOG_PYTHON_JSON: 'blog/python-json-indent',
    BLOG_VALIDATOR_GUIDE: 'blog/json-validator-guide',
    BLOG_WORKING_WITH_NESTED_JSON_STRUCTURES: 'blog/working-with-nested-json-structures',
    BLOG_JSON_PERFORMANCE_OPTIMIZATION: 'blog/json-performance-optimization',

    // Legal
    PRIVACY: 'privacy-policy',
    TERMS: 'terms-of-service',
    COOKIES: 'cookie-policy',
    SECURITY: 'security-policy',
} as const;
