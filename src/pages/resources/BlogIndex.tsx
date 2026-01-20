import React from 'react';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { Link } from 'react-router-dom';
import { blogContent } from '../../data/blogContent';
import { SEO } from '../../components/SEO';
import { getPageSEO } from '../../config/seo';

export const BlogIndex: React.FC = () => {
    // Convert object to array for mapping and sort by date descending
    const posts = Object.entries(blogContent)
        .map(([slug, data]) => ({
            slug,
            ...data
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <SEO {...getPageSEO('blog')} />
            <StaticPageLayout
                title="Developer Blog"
                description="Insights, tutorials, and updates from the JSON Indenter team."
                maxWidth="max-w-5xl"
            >
                <div className="grid gap-8 not-prose">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="flex flex-col p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase text-slate-500 mb-3">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-3 text-brand-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="mt-4 font-bold text-brand-primary text-sm flex items-center">
                                Read Article
                                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </StaticPageLayout>
        </>
    );
};
