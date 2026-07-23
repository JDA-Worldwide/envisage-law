import { defineType, defineField, defineArrayMember } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "recognitionBand",
  title: "Recognition Band",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Year / Edition",
      type: "string",
      description: "e.g. '2025 Edition'",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. 'Recognized in Best Law Firms®'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tiers",
      title: "Tiers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "rank",
              title: "Rank",
              type: "string",
              description: "e.g. 'Regional Tier 1'",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. 'Corporate Law'",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "rank", subtitle: "label" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "title", year: "year" },
    prepare({ title, year }) {
      return {
        title: title || "Recognition Band",
        subtitle: year || "Recognition Band",
      };
    },
  },
});
