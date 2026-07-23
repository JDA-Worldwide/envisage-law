import { defineType, defineField, defineArrayMember } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "highlightGrid",
  title: "Highlight Grid",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional — used by the dark variant for an overlay background",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Numbered (border-top, numbered labels)", value: "numbered" },
          { title: "Dark (dark overlay, white text, accent dots)", value: "dark" },
          { title: "Light (border-top, accent dots)", value: "light" },
          { title: "Chips (grid of label badges)", value: "chips" },
        ],
      },
      initialValue: "light",
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", variant: "variant", items: "items" },
    prepare({ title, variant, items }) {
      return {
        title: title || "Highlight Grid",
        subtitle: `${variant ?? "light"} · ${items?.length ?? 0} items`,
      };
    },
  },
});
