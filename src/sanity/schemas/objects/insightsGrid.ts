import { defineType, defineField } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "insightsGrid",
  title: "Insights Grid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "linkLabel",
      title: "View All Link Label",
      type: "string",
      description: "e.g. 'All Insights'",
    }),
    defineField({
      name: "linkUrl",
      title: "View All Link URL",
      type: "string",
      initialValue: "/insights",
    }),
    defineField({
      name: "count",
      title: "Number of Insights",
      type: "number",
      initialValue: 3,
      validation: (rule) => rule.min(1).max(12),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Insights Grid",
        subtitle: "Insights Grid",
      };
    },
  },
});
