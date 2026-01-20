import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { StaticPageLayout } from '../../layouts/StaticPageLayout';
import { blogContent } from '../../data/blogContent';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import { SEO } from '../../components/SEO';
import { getBlogPostSEO } from '../../config/seo';
import { ROUTES } from '../../constants/routes';
import { useThemeStore } from '../../store/themeStore';

export const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? blogContent[slug] : null;
    const { isDarkMode } = useThemeStore();

    if (!slug || !post) {
        return <Navigate to={`/${ROUTES.BLOG}`} replace />;
    }

    return (
        <>
            <SEO {...getBlogPostSEO(post.title, post.excerpt, slug)} />
            <StaticPageLayout title={post.title} maxWidth="max-w-5xl">
                <div className="not-prose mb-8 -mt-8">
                    <Link to={`/${ROUTES.BLOG}`} className="inline-flex items-center text-sm font-medium text-brand-primary hover:underline mb-6">
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Blog
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="font-semibold">{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>

                {/* Render HTML Content with dynamic theme-aware styling */}
                <div
                    className={`prose ${isDarkMode ? 'prose-invert prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-code:text-blue-300 prose-code:bg-slate-800 prose-pre:bg-slate-900 prose-pre:text-slate-50' : 'prose-slate prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-code:text-brand-primary prose-code:bg-gray-100 prose-pre:bg-gray-50 prose-pre:text-slate-900'} max-w-none`}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                />
            </StaticPageLayout>
        </>
    );
};
