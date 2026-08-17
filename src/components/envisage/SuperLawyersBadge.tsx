"use client";

import Script from "next/script";
import { stegaClean } from "@sanity/client/stega";

interface SuperLawyersBadgeProps {
  profileUrl: string;
  name: string;
}

/**
 * Super Lawyers' badge script concatenates `&utm_medium={hostname}` onto
 * the profile href. Without an existing `?`, that `&` becomes part of the
 * path and the profile 404s.
 */
function hrefForSuperLawyersWidget(url: string): string {
  const cleaned = stegaClean(url).trim().split("#")[0];
  return cleaned.includes("?") ? cleaned : `${cleaned}?utm_source=badge`;
}

export default function SuperLawyersBadge({
  profileUrl,
  name,
}: SuperLawyersBadgeProps) {
  const widgetHref = hrefForSuperLawyersWidget(profileUrl);

  return (
    <div
      data-slbadge="v2-slbadge-red"
      className="mt-[22px] flex justify-center rounded-md"
      style={{ fontFamily: "arial, sans-serif" }}
    >
      <Script
        src="https://www.superlawyers.com/static/sl-badge/v2/load.min.js"
        strategy="lazyOnload"
      />
      <a
        className="slbadge_profileurl"
        href={widgetHref}
        target="_blank"
        rel="noopener noreferrer"
        title={`View the Super Lawyers profile of ${name}`}
      >
        {name}
      </a>
    </div>
  );
}
