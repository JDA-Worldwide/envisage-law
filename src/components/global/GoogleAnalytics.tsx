import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * Injects the Google tag (gtag.js) snippet, reproducing the tag used on the
 * current envisage.law site. Renders nothing unless `NEXT_PUBLIC_GA_ID` is
 * set, and is suppressed via `disabled` in Draft Mode so editor preview
 * sessions are not tracked.
 */
export default function GoogleAnalytics({ disabled }: { disabled?: boolean }) {
  if (!GA_ID || disabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
