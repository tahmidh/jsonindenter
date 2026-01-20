import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { ErrorPopup } from './components/ErrorPopup';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Lazy load all pages for code-splitting
const IndenterPage = React.lazy(() => import('./pages/IndenterPage').then(m => ({ default: m.IndenterPage })));
const ValidatorPage = React.lazy(() => import('./pages/ValidatorPage').then(m => ({ default: m.ValidatorPage })));
const MinifierPage = React.lazy(() => import('./pages/MinifierPage').then(m => ({ default: m.MinifierPage })));
const CsvConverterPage = React.lazy(() => import('./pages/CsvConverterPage').then(m => ({ default: m.CsvConverterPage })));
const XmlConverterPage = React.lazy(() => import('./pages/XmlConverterPage').then(m => ({ default: m.XmlConverterPage })));
const SchemaGeneratorPage = React.lazy(() => import('./pages/SchemaGeneratorPage').then(m => ({ default: m.SchemaGeneratorPage })));
const JsonToYamlPage = React.lazy(() => import('./pages/JsonToYamlPage').then(m => ({ default: m.JsonToYamlPage })));
const JsonToTomlPage = React.lazy(() => import('./pages/JsonToTomlPage').then(m => ({ default: m.JsonToTomlPage })));
const JsonToTypescriptPage = React.lazy(() => import('./pages/JsonToTypescriptPage').then(m => ({ default: m.JsonToTypescriptPage })));

// Static Pages
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import('./pages/legal/TermsOfService').then(m => ({ default: m.TermsOfService })));
const CookiePolicy = React.lazy(() => import('./pages/legal/CookiePolicy').then(m => ({ default: m.CookiePolicy })));
const Security = React.lazy(() => import('./pages/legal/Security').then(m => ({ default: m.Security })));

const Documentation = React.lazy(() => import('./pages/resources/Documentation').then(m => ({ default: m.Documentation })));
const ApiReference = React.lazy(() => import('./pages/resources/ApiReference').then(m => ({ default: m.ApiReference })));
const JsonStructureGuide = React.lazy(() => import('./pages/resources/JsonStructureGuide').then(m => ({ default: m.JsonStructureGuide })));
const BlogIndex = React.lazy(() => import('./pages/resources/BlogIndex').then(m => ({ default: m.BlogIndex })));
const BlogPost = React.lazy(() => import('./pages/resources/BlogPost').then(m => ({ default: m.BlogPost })));

const GA_MEASUREMENT_ID = 'G-58HK3N72XD';
ReactGA.initialize(GA_MEASUREMENT_ID);

// Loading fallback component
const PageLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#666'
    }}>
        Loading...
    </div>
);

const App: React.FC = () => {
    const location = useLocation();

    React.useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }, [location]);

    return (
        <>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<IndenterPage />} />
                        <Route path={ROUTES.VALIDATOR} element={<ValidatorPage />} />
                        <Route path={ROUTES.MINIFIER} element={<MinifierPage />} />
                        <Route path={ROUTES.JSON_TO_CSV} element={<CsvConverterPage />} />
                        <Route path={ROUTES.JSON_TO_XML} element={<XmlConverterPage />} />
                        <Route path={ROUTES.JSON_TO_SCHEMA} element={<SchemaGeneratorPage />} />
                        <Route path={ROUTES.JSON_TO_YAML} element={<JsonToYamlPage />} />
                        <Route path={ROUTES.JSON_TO_TOML} element={<JsonToTomlPage />} />
                        <Route path={ROUTES.JSON_TO_TYPESCRIPT} element={<JsonToTypescriptPage />} />

                        {/* Resources */}
                        <Route path={ROUTES.DOCS} element={<Documentation />} />
                        <Route path={ROUTES.API} element={<ApiReference />} />
                        <Route path={ROUTES.JSON_GUIDE} element={<JsonStructureGuide />} />
                        <Route path={ROUTES.BLOG} element={<BlogIndex />} />
                        <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />

                        {/* Legal */}
                        <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
                        <Route path={ROUTES.TERMS} element={<TermsOfService />} />
                        <Route path={ROUTES.COOKIES} element={<CookiePolicy />} />
                        <Route path={ROUTES.SECURITY} element={<Security />} />

                        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                    </Route>
                </Routes>
            </Suspense>
            <ErrorPopup />
        </>
    );
};

export default App;
