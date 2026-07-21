import { defineType, defineField } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "ctaBand",
  title: "CTA Band",
  type: "object",
  description: "Full-width call-to-action band with eyebrow, heading, and buttons",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the heading",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryButton",
      title: "Primary Button",
      type: "link",
    }),
    defineField({
      name: "secondaryButton",
      title: "Secondary Button",
      type: "link",
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "CTA Band",
        subtitle: "CTA Band",
      };
    },
  },
});
