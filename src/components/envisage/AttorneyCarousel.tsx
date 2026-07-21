"use client";

import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import AttorneyCard from "./AttorneyCard";
import { ArrowIcon } from "./Icons";
interface Attorney {
  slug: string;
  name: string;
  role: string;
  niche: string;
  hasProfile: boolean;
  href: string;
  photo: string;
}

interface AttorneyCarouselProps {
  attorneys: Attorney[];
}

function getCardsPerView() {
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 3;
  return 4;
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

export default function AttorneyCarousel({ attorneys }: AttorneyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardsPerView = useSyncExternalStore(subscribeToResize, getCardsPerView, () => 4);
  const totalPages = Math.ceil(attorneys.length / cardsPerView);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);

    const cardWidth = el.scrollWidth / attorneys.length;
    const currentCard = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.floor(currentCard / cardsPerView), totalPages - 1));
  }, [attorneys.length, cardsPerView, totalPages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const frameId = requestAnimationFrame(updateScrollState);
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  const scrollToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / attorneys.length;
    el.scrollTo({ left: page * cardsPerView * cardWidth, behavior: "smooth" });
  };

  // Card width classes: 1 card on mobile, 1/3 on tablet, 1/4 on desktop
  // Using calc to account for gaps: gap is 26px
  const cardClass = "w-full flex-none sm:w-[calc((100%-52px)/3)] lg:w-[calc((100%-78px)/4)]";

  return (
    <div>
      {/* Header */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Our Legal Team</p>
          <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Meet our legal team</h2>
        </div>
        <Link
          href="/legal-team"
          className="inline-flex items-center gap-2.5 rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
        >
          Legal Team <ArrowIcon />
        </Link>
      </div>

      {/* Carousel with flanking arrows */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll attorneys left"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-brand-border bg-white transition-all hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current sm:h-11 sm:w-11"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-[26px]">
            {attorneys.map((a) => (
              <div key={a.slug} className={cardClass} style={{ scrollSnapAlign: "start" }}>
                <AttorneyCard attorney={a} showNiche />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll attorneys right"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-brand-border bg-white transition-all hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current sm:h-11 sm:w-11"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === activeIndex
                  ? "w-7 bg-brand-primary"
                  : "w-2.5 bg-brand-border hover:bg-brand-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
