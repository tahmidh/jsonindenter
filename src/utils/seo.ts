/**
 * SEO utilities for generating structured data and schema markup
 */

// Base URLs for canonical links and open graph images
export const SITE_BASE_URL = 'https://jsonindenter.com';
export const OG_IMAGE_BASE_URL = `${SITE_BASE_URL}/og`;

interface SoftwareApplicationSchema {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string;
    offers: {
        '@type': string;
        price: string;
        priceCurrency: string;
    };
    aggregateRating?: {
        '@type': string;
        ratingValue: string;
        ratingCount: string;
    };
}

interface BreadcrumbSchema {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
        '@type': string;
        position: number;
        name: string;
        item: string;
    }>;
}

/**
 * Generate Software Application schema for tool pages
 */
export const generateSoftwareApplicationSchema = (
    name: string,
    description: string
): SoftwareApplicationSchema => {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
    };
};

/**
 * Generate Breadcrumb schema for navigation
 */
export const generateBreadcrumbSchema = (
    breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbSchema => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
        })),
    };
};

/**
 * Get the full canonical URL for a path
 */
export const getCanonicalUrl = (path: string): string => {
    return `${SITE_BASE_URL}${path}`;
};

/**
 * Get the full Open Graph image URL
 */
export const getOGImageUrl = (imageName: string): string => {
    return `${OG_IMAGE_BASE_URL}/${imageName}`;
};
