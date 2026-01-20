/**
 * SEO component using react-helmet-async for dynamic meta tags
 */

import { Helmet } from 'react-helmet-async';
import type { PageSEO } from '../config/seo';

interface SEOProps extends PageSEO { }

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    keywords,
    image,
    schema,
    noindex = false,
}) => {
    const siteName = 'JSON Indenter Pro';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonical} />

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex, follow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={title} />
            <meta name="twitter:site" content="@jsonindenter" />

            {/* Schema.org Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
                </script>
            )}
        </Helmet>
    );
};
