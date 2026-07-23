import { defineType, defineField } from "sanity";
import { isUnique } from "@/sanity/lib/isUnique";

export default defineType({
  name: "practiceArea",
  title: "Practice Area",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", isUnique },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Key",
      type: "string",
      description: "Icon identifier used by the frontend (e.g. ip, regulatory, construction)",
      options: {
        list: [
          { title: "IP & Technology", value: "ip" },
          { title: "Regulatory & Healthcare", value: "regulatory" },
          { title: "Construction & Commercial", value: "construction" },
          { title: "Nonprofit & Ministry", value: "nonprofit" },
          { title: "HOA & Community", value: "hoa" },
          { title: "Data Privacy & Security", value: "data" },
        ],
      },
    }),
    defineField({
      name: "standfirst",
      title: "Standfirst",
      type: "text",
      rows: 3,
      description: "Short description shown on the Practice Areas hub card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      description: "Subtitle displayed in the hero banner on the detail page",
    }),
    defineField({
      name: "body",
      title: "Positioning Copy",
      type: "array",
      of: [{ type: "block" }],
      description: "Intro paragraphs for the detail page",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [{ type: "string" }],
      description: "Checklist of what the practice handles",
    }),
    defineField({
      name: "featuredCapability",
      title: "Featured Capability Highlight",
      type: "object",
      description: "Optional dark-background highlight band",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "e.g. 'Featured Capability · Ongoing Relationship'",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "string" }],
          description: "Pill labels, e.g. Selection, Clearance, Registration",
        }),
      ],
    }),
    defineField({
      name: "anchoringAttorney",
      title: "Anchoring Attorney",
      type: "reference",
      to: [{ type: "attorney" }],
    }),
    defineField({
      name: "anchoringHeading",
      title: "Anchoring Section Heading",
      type: "string",
      description:
        "e.g. 'Led by a Board-Certified Trademark Specialist'",
    }),
    defineField({
      name: "anchoringRoleLabel",
      title: "Anchoring Attorney Role Label",
      type: "string",
      description:
        "Custom role line for this context, e.g. 'Partner · NC Board Certified Specialist, Trademark Law'",
    }),
    defineField({
      name: "anchoringDescription",
      title: "Anchoring Attorney Description",
      type: "text",
      rows: 4,
      description: "Practice-specific description of the anchoring attorney",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      description:
        "e.g. 'Discuss an IP or technology matter'. Falls back to a default if blank.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls sort order on the Practice Areas hub page",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "standfirst",
    },
  },
});
