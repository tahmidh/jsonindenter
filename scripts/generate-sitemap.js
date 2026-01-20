import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://jsonindenter.com';
const TODAY = new Date().toISOString().split('T')[0];

// Import ROUTES from the source file
const routesPath = join(__dirname, '../src/constants/routes.ts');
const routesContent = readFileSync(routesPath, 'utf-8');
const routesMatch = routesContent.match(/export const ROUTES = ({[\s\S]*?}) as const;/);
const ROUTES = eval(`(${routesMatch[1]})`);

// Extract blog post routes (those starting with BLOG_ but not BLOG or BLOG_POST)
const BLOG_POST_ROUTES = Object.entries(ROUTES)
    .filter(([key]) => key.startsWith('BLOG_') && key !== 'BLOG_POST')
    .map(([, value]) => value);

// URL configuration: [path, changefreq, priority, lastmod]
const urls = [
    // Core Tools
    [ROUTES.HOME, 'weekly', '1.0', TODAY],
    [`/${ROUTES.VALIDATOR}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.MINIFIER}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.JSON_TO_CSV}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.JSON_TO_XML}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.JSON_TO_SCHEMA}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.JSON_TO_YAML}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.JSON_TO_TOML}`, 'monthly', '0.8', TODAY],
    [`/${ROUTES.JSON_TO_TYPESCRIPT}`, 'monthly', '0.8', TODAY],

    // Resources
    [`/${ROUTES.DOCS}`, 'monthly', '0.7', TODAY],
    [`/${ROUTES.API}`, 'monthly', '0.6', TODAY],
    [`/${ROUTES.JSON_GUIDE}`, 'monthly', '0.7', TODAY],
    [`/${ROUTES.BLOG}`, 'weekly', '0.7', TODAY],

    // Blog Posts
    ...BLOG_POST_ROUTES.map(route => [`/${route}`, 'monthly', '0.6', TODAY]),

    // Legal
    [`/${ROUTES.PRIVACY}`, 'yearly', '0.4', TODAY],
    [`/${ROUTES.TERMS}`, 'yearly', '0.4', TODAY],
    [`/${ROUTES.COOKIES}`, 'yearly', '0.4', TODAY],
    [`/${ROUTES.SECURITY}`, 'yearly', '0.5', TODAY],
];

function generateSitemap() {
    const urlEntries = urls
        .map(([path, changefreq, priority, lastmod]) => {
            const loc = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
            return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        })
        .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    return sitemap;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = join(__dirname, '../public/sitemap.xml');

writeFileSync(outputPath, sitemap, 'utf-8');
console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(`📄 Total URLs: ${urls.length}`);
