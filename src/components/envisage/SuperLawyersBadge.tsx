"use client";

import Script from "next/script";
import { stegaClean } from "@sanity/client/stega";

interface SuperLawyersBadgeProps {
  profileUrl: string;
  name: string;
}

export default function SuperLawyersBadge({
  profileUrl,
  name,
}: SuperLawyersBadgeProps) {
  const cleanUrl = stegaClean(profileUrl);

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
        href={cleanUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`View the Super Lawyers profile of ${name}`}
      >
        {name}
      </a>
    </div>
  );
}
