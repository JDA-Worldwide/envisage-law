import {
  PortableText as BasePortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";
import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import PortableTextTable, {
  type PortableTextTableValue,
} from "./Table";

const marks: PortableTextReactComponents["marks"] = {
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  link: ({ children, value }) => {
    const href = value?.href as string | undefined;
    const isExternal =
      Boolean(value?.blank) || stegaClean(href ?? "").startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-brand-secondary underline hover:no-underline"
      >
        {children}
      </a>
    );
  },
};

const proseComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h2 className="mb-4 mt-8 font-display text-3xl font-bold">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-display text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-display text-2xl font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 font-display text-xl font-semibold">
        {children}
      </h4>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-secondary pl-4 italic text-brand-muted">
        {children}
      </blockquote>
    ),
  },
  marks,
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <figure className="my-8">
        <SanityImage image={value} width={1200} height={675} sizes="100vw" />
      </figure>
    ),
    table: ({ value }: { value: PortableTextTableValue }) => (
      <PortableTextTable value={value} />
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
  },
};

const inlineComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="m-0">{children}</p>,
  },
  marks,
};

interface CustomPortableTextProps {
  value: unknown[];
  variant?: "prose" | "inline";
}

export default function PortableText({
  value,
  variant = "prose",
}: CustomPortableTextProps) {
  if (!value?.length) return null;

  if (variant === "inline") {
    return (
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      <BasePortableText value={value as any} components={inlineComponents} />
    );
  }

  return (
    <div className="prose max-w-none">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <BasePortableText value={value as any} components={proseComponents} />
    </div>
  );
}
