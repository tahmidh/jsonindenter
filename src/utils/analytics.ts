import ReactGA from 'react-ga4';

/**
 * Enhanced Google Analytics tracking utility
 */
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    try {
        ReactGA.event({
            category,
            action,
            label,
            value,
        });

        // Also log to console in development
        if (import.meta.env.DEV) {
            console.log(`[GA Event] ${category} > ${action} ${label ? `(${label})` : ''}`);
        }
    } catch (error) {
        console.error('GA Tracking Error:', error);
    }
};

/**
 * Tracks button clicks
 */
export const trackButtonClick = (buttonName: string, context?: string) => {
    trackEvent('Button', 'Click', `${buttonName}${context ? ` - ${context}` : ''}`);
};

/**
 * Tracks navigation
 */
export const trackNavigation = (to: string, from: string) => {
    trackEvent('Navigation', 'Link Click', `To: ${to} (From: ${from})`);
};

/**
 * Tracks tool usage
 */
export const trackToolUsage = (toolName: string, action: string) => {
    trackEvent('Tool', action, toolName);
};

/**
 * Tracks settings changes
 */
export const trackSettingChange = (settingName: string, value: string) => {
    trackEvent('Settings', 'Change', `${settingName}: ${value}`);
};
