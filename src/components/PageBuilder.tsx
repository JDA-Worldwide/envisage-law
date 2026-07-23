import type { ComponentType } from "react";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import TextBlock from "./modules/TextBlock";
import FeatureGrid from "./modules/FeatureGrid";
import StatsCounter from "./modules/StatsCounter";
import LogoBar from "./modules/LogoBar";
import ImageGallery from "./modules/ImageGallery";
import VideoEmbed from "./modules/VideoEmbed";
import Testimonials from "./modules/Testimonials";
import FAQ from "./modules/FAQ";
import ContactForm from "./modules/ContactForm";
import AttorneyGrid from "./modules/AttorneyGrid";
import PracticeAreaGrid from "./modules/PracticeAreaGrid";
import AnchoringAttorneyBand from "./modules/AnchoringAttorneyBand";
import ContactMethods from "./modules/ContactMethods";
import CtaBand from "./modules/CtaBand";
import EnvisageHero from "./modules/EnvisageHero";
import RichTextSection from "./modules/RichTextSection";
import TextImageSplit from "./modules/TextImageSplit";
import HighlightGrid from "./modules/HighlightGrid";
import InsightsGrid from "./modules/InsightsGrid";
import RecognitionBand from "./modules/RecognitionBand";
import LocationGrid from "./modules/LocationGrid";
import ImageBand from "./modules/ImageBand";
import { JsonLd, faqPageSchema } from "@/lib/jsonLd";
import { toPlainText, type PortableTextBlock } from "@portabletext/react";

interface Module {
  _type: string;
  _key: string;
  colorScheme?: "light" | "surface" | "neutral-1" | "neutral-2" | "dark";
  anchorSlug?: { current?: string };
  [key: string]: unknown;
}

interface FAQModule extends Module {
  items?: Array<{ _key: string; question: string; answer: unknown[] }>;
}

interface PageBuilderProps {
  modules?: Module[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const moduleMap: Record<string, ComponentType<any>> = {
  textBlock: TextBlock,
  featureGrid: FeatureGrid,
  statsCounter: StatsCounter,
  logoBar: LogoBar,
  imageGallery: ImageGallery,
  videoEmbed: VideoEmbed,
  testimonials: Testimonials,
  faq: FAQ,
  contactForm: ContactForm,
  attorneyGrid: AttorneyGrid,
  practiceAreaGrid: PracticeAreaGrid,
  anchoringAttorneyBand: AnchoringAttorneyBand,
  contactMethods: ContactMethods,
  ctaBand: CtaBand,
  envisageHero: EnvisageHero,
  richTextSection: RichTextSection,
  textImageSplit: TextImageSplit,
  highlightGrid: HighlightGrid,
  insightsGrid: InsightsGrid,
  recognitionBand: RecognitionBand,
  locationGrid: LocationGrid,
  imageBand: ImageBand,
};

// Full-bleed modules render edge-to-edge with no section padding wrapper.
const fullBleedModules = new Set(["envisageHero", "ctaBand", "highlightGrid", "recognitionBand", "imageBand"]);

function buildFaqJsonLd(module: FAQModule) {
  if (!module.items?.length) return null;

  const items = module.items.map((item) => ({
    question: item.question,
    answer: toPlainText(item.answer as PortableTextBlock[]),
  }));

  return <JsonLd key={`${module._key}-jsonld`} data={faqPageSchema(items)} />;
}

export default function PageBuilder({ modules }: PageBuilderProps) {
  if (!modules?.length) return null;

  return (
    <>
      {modules.map((module) => {
        const Component = moduleMap[module._type];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`No component found for module type: ${module._type}`);
          }
          return null;
        }

        const scheme = stegaClean(module.colorScheme);
        const schemeClass =
          scheme === "dark" ? "scheme-dark" :
          scheme === "surface" ? "scheme-surface" :
          scheme === "neutral-1" ? "scheme-neutral-1" :
          scheme === "neutral-2" ? "scheme-neutral-2" :
          undefined;

        const anchorId = stegaClean(module.anchorSlug?.current) || undefined;
        const scrollClass = anchorId ? "scroll-mt-[var(--header-height)]" : undefined;
        const isFullBleed = fullBleedModules.has(module._type);

        if (isFullBleed) {
          return (
            <div key={module._key} id={anchorId} className={cn(schemeClass, scrollClass)}>
              {module._type === "faq" && buildFaqJsonLd(module as FAQModule)}
              <Component {...module} />
            </div>
          );
        }

        return (
          <div key={module._key} id={anchorId} className={cn(schemeClass, scrollClass)}>
            <section className="mx-auto max-w-container py-section">
              {module._type === "faq" && buildFaqJsonLd(module as FAQModule)}
              <Component {...module} />
            </section>
          </div>
        );
      })}
    </>
  );
}
