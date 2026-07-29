"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
          },
          element: string,
        ) => void;
      };
    };
  }
}

export default function GoogleTranslate({ isPreview }: { isPreview: boolean }) {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,zh-CN",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };
  }, []);

  // Google Translate rewrites DOM text nodes, which corrupts the invisible
  // stega characters used by visual editing. Skip the widget in preview so
  // the Presentation tool's stega decoding doesn't throw.
  if (isPreview) return null;

  return (
    <div>
      <span className="sr-only-text" id="google-translate-label">
        Translate this site
      </span>
      <div
        id="google_translate_element"
        aria-labelledby="google-translate-label"
      />
      <p className="mt-1 text-[10px] text-white/50 whitespace-nowrap">
        Powered by <span className="text-white">Google Translate</span>
      </p>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}
