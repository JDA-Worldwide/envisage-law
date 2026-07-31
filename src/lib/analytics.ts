/**
 * Google Analytics (gtag.js)
 * --------------------------
 * The Google tag ID is read from `NEXT_PUBLIC_GA_ID` so it can be swapped
 * without a code change (e.g. when the client provides an updated embed
 * code). The current envisage.law site uses the Google tag `GT-NFBLTJW`.
 *
 * The `<GoogleAnalytics />` component (rendered in the root layout) injects
 * the gtag snippet. Use `trackEvent` anywhere on the client to record a
 * custom event.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["set", string, unknown];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/**
 * Record a custom Google Analytics event. No-op if the Google tag has not
 * loaded (GA_ID unset, blocked, or suppressed in preview).
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
