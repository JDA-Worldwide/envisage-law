"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "cookie-consent-dismissed";

export default function CookieConsent({ message }: { message?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isIframe = window.self !== window.top;
    if (message && !isIframe && !localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, [message]);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-brand-primary px-4 py-4 text-white shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4">
        <p className="text-sm leading-relaxed text-white/90">{message}</p>
        <button
          onClick={dismiss}
          className="flex-none rounded-sm bg-white px-6 py-2 text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-colors hover:bg-white/90"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
