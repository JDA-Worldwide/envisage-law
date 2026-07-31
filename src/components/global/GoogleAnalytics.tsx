import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * Injects the Google Tag Manager / gtag.js snippet, reproducing the tag used
 * on the current envisage.law site. Renders nothing unless `NEXT_PUBLIC_GA_ID`
 * is set, and is suppressed via `disabled` in Draft Mode so editor preview
 * sessions are not tracked.
 */
export default function GoogleAnalytics({ disabled }: { disabled?: boolean }) {
  if (!GA_ID || disabled) return null;

  return (
    <>
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("set","linker",{"domains":["envisage.law"]});
          gtag("js", new Date());
          gtag("set", "developer_id.dZTNiMT", true);
          gtag("config", "${GA_ID}");
        `}
      </Script>
    </>
  );
}
