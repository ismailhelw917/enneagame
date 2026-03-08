/**
 * Simple Analytics Service for Enneagram & Games
 * In a real-world scenario, this would connect to a service like Google Analytics, 
 * Mixpanel, or a custom backend.
 */

type EventParams = Record<string, string | number | boolean>;

class AnalyticsService {
  private isEnabled: boolean = true;

  constructor() {
    // Check for environment variable or user preference if needed
    this.isEnabled = import.meta.env.PROD || true;
  }

  /**
   * Track a page view or tab change
   */
  trackPageView(pageName: string) {
    if (!this.isEnabled) return;
    
    console.log(`[Analytics] Page View: ${pageName}`, {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    });
    
    // In a real app: window.gtag('event', 'page_view', { page_title: pageName });
  }

  /**
   * Track a specific user action
   */
  trackEvent(eventName: string, params?: EventParams) {
    if (!this.isEnabled) return;

    console.log(`[Analytics] Event: ${eventName}`, {
      ...params,
      timestamp: new Date().toISOString(),
    });

    // In a real app: window.gtag('event', eventName, params);
  }

  /**
   * Track errors for debugging
   */
  trackError(error: Error, context?: string) {
    if (!this.isEnabled) return;

    console.error(`[Analytics] Error: ${error.message}`, {
      context,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }
}

export const analytics = new AnalyticsService();
