#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command-line arguments
const args = process.argv.slice(2);
const argMap = {};

for (let i = 0; i < args.length; i += 2) {
    const key = args[i].startsWith('--') ? args[i].slice(2) : args[i];
    const value = args[i + 1];
    argMap[key] = value;
}

// Validate required arguments
const required = ['slug', 'title', 'description', 'excerpt', 'readTime'];
for (const field of required) {
    if (!argMap[field]) {
        console.error(`❌ Missing required argument: --${field}`);
        process.exit(1);
    }
}

const slug = argMap.slug;
const title = argMap.title;
const description = argMap.description;
const excerpt = argMap.excerpt;
const readTime = argMap.readTime;
const date = argMap.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const keywords = argMap.keywords || 'json, tutorial';
let content = argMap.content || '';

// If content is a file path, read it
if (content && existsSync(content)) {
    content = readFileSync(content, 'utf-8');
}

if (!content || content.trim() === '') {
    console.error('❌ Missing content. Provide --content with HTML content or path to HTML file.');
    process.exit(1);
}

// Convert slug to TypeScript constant name
const constantName = 'BLOG_' + slug
    .split('-')
    .map(word => word.toUpperCase())
    .join('_');

console.log(`📝 Creating blog post: ${title}`);
console.log(`📌 Slug: ${slug}`);
console.log(`🏷️  Constant: ${constantName}`);

try {
    // 1. Add route constant to ROUTES
    console.log('\n✏️  Adding route constant...');
    addRouteConstant(constantName, slug);

    // 2. Add blog post to blogContent
    console.log('✏️  Adding blog post content...');
    addBlogContent(slug, title, date, readTime, excerpt, content);

    // 3. Add SEO config
    console.log('✏️  Adding SEO configuration...');
    addSeoConfig(slug, title, description, keywords);

    console.log('\n✅ Blog post created successfully!');
    console.log(`\nNext steps:`);
    console.log(`1. Run: npm run build`);
    console.log(`2. Import ROUTES.${constantName} in your components`);
    console.log(`3. Reference in links: <a href="/${slug}">...</a>`);
} catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
}

/**
 * Add route constant to src/constants/routes.ts
 */
function addRouteConstant(constantName, slug) {
    const filePath = join(__dirname, '../src/constants/routes.ts');
    let content = readFileSync(filePath, 'utf-8');

    // Check if constant already exists
    if (new RegExp(`${constantName}:`).test(content)) {
        throw new Error(`Route constant ${constantName} already exists`);
    }

    // Find the BLOG_VALIDATOR_GUIDE line and add after it
    const match = content.match(/(\s+BLOG_VALIDATOR_GUIDE: 'blog\/json-validator-guide',)/);
    if (!match) {
        throw new Error('Could not find insertion point in routes.ts');
    }

    const newRoute = `${match[1]}\n    ${constantName}: 'blog/${slug}',`;
    content = content.replace(match[1], newRoute);

    writeFileSync(filePath, content, 'utf-8');
    console.log(`   Added: ${constantName}: 'blog/${slug}'`);
}

/**
 * Add blog post to src/data/blogContent.ts
 */
function addBlogContent(slug, title, date, readTime, excerpt, content) {
    const filePath = join(__dirname, '../src/data/blogContent.ts');
    let fileContent = readFileSync(filePath, 'utf-8');

    // Check if post already exists
    if (fileContent.includes(`'${slug}':`)) {
        throw new Error(`Blog post with slug "${slug}" already exists`);
    }

    // Escape single quotes in content for TypeScript template literal
    const escapedContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');

    // Find the last blog post entry and add after it
    const lastPostMatch = fileContent.match(/(\n    \}\n\};)/);
    if (!lastPostMatch) {
        throw new Error('Could not find insertion point in blogContent.ts');
    }

    const newPost = `    '${slug}': {
        title: "${title}",
        date: "${date}",
        readTime: "${readTime}",
        excerpt: "${excerpt}",
        content: \`
            ${escapedContent}
        \`
    },
${lastPostMatch[1]}`;

    fileContent = fileContent.replace(lastPostMatch[0], newPost);
    writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`   Added: '${slug}' blog post`);
}

/**
 * Add SEO config to src/config/seo.ts
 */
function addSeoConfig(slug, title, description, keywords) {
    const filePath = join(__dirname, '../src/config/seo.ts');
    let fileContent = readFileSync(filePath, 'utf-8');

    // Add to PageKey type
    const pageKeyMatch = fileContent.match(
        /type PageKey =\s*\|([\s\S]*?)\n\s*\|\s*'blog';/
    );
    if (!pageKeyMatch) {
        throw new Error('Could not find PageKey type in seo.ts');
    }

    // Check if slug already in PageKey
    if (fileContent.includes(`| '${slug}'`)) {
        throw new Error(`PageKey '${slug}' already exists in seo.ts`);
    }

    // Add to PageKey type (before 'blog')
    let newFileContent = fileContent.replace(
        /(\| 'blog';)/,
        `| '${slug}'\n    | 'blog';`
    );

    // Add SEO config object
    const seoConfigMatch = newFileContent.match(
        /(    blog: \{[\s\S]*?\},\n\};)/
    );
    if (!seoConfigMatch) {
        throw new Error('Could not find blog config in seo.ts');
    }

    // Generate SEO title with branding
    const seoTitle = `${title} - JSON Blog | JSON Indenter Pro`;
    const seoDescription = description.length > 160
        ? description.substring(0, 157) + '...'
        : description;

    const newSeoConfig = `    '${slug}': {
        title: '${seoTitle}',
        description: '${seoDescription}',
        canonical: getCanonicalUrl(\`/\${ROUTES.BLOG_${slug
            .split('-')
            .map(w => w.toUpperCase())
            .join('_')}}\`),
        keywords: '${keywords}',
        image: getOGImageUrl('indenter.png'),
        schema: [
            generateBreadcrumbSchema([
                { name: 'Home', url: SITE_BASE_URL },
                { name: 'Blog', url: \`\${SITE_BASE_URL}/\${ROUTES.BLOG}\` },
                { name: '${title}', url: \`\${SITE_BASE_URL}/\${ROUTES.BLOG_${slug
            .split('-')
            .map(w => w.toUpperCase())
            .join('_')}}\` },
            ]),
        ],
    },
    blog: {
        title: 'JSON Blog - Tips, Tutorials & Best Practices',
        description:
            'Expert tips, tutorials, and best practices for working with JSON. Learn formatting techniques, validation strategies, and data transformation methods.',
        canonical: getCanonicalUrl(\`/\${ROUTES.BLOG}\`),
        keywords:
            'json blog, json tips, json tutorials, json best practices, json articles, json resources',
        image: getOGImageUrl('indenter.png'),
    },
};`;

    newFileContent = newFileContent.replace(seoConfigMatch[1], newSeoConfig);

    writeFileSync(filePath, newFileContent, 'utf-8');
    console.log(`   Added: '${slug}' SEO config`);
    console.log(`   Title: ${seoTitle}`);
}
