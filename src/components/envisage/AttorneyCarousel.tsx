"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AttorneyCard from "./AttorneyCard";
import { ArrowIcon } from "./Icons";
import type { Attorney } from "@/lib/data";

interface AttorneyCarouselProps {
  attorneys: Attorney[];
}

export default function AttorneyCarousel({ attorneys }: AttorneyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth;
    el.scrollTo({ left: direction === "left" ? 0 : el.scrollWidth - el.offsetWidth, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Our Attorneys</p>
          <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Meet our attorneys</h2>
        </div>
        <Link
          href="/attorneys"
          className="inline-flex items-center gap-2.5 rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
        >
          All Attorneys <ArrowIcon />
        </Link>
      </div>

      {/* Carousel with flanking arrows */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll attorneys left"
          className="hidden flex-none items-center justify-center rounded-full border border-brand-border bg-white h-11 w-11 transition-all hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current lg:flex"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-x-scroll overflow-y-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="grid w-[200%] grid-cols-8 gap-[26px]">
            {attorneys.map((a) => (
              <div key={a.slug}>
                <AttorneyCard attorney={a} showNiche />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll attorneys right"
          className="hidden flex-none items-center justify-center rounded-full border border-brand-border bg-white h-11 w-11 transition-all hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current lg:flex"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
