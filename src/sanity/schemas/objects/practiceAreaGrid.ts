import { defineType, defineField } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "practiceAreaGrid",
  title: "Practice Area Grid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Practice Area Grid",
        subtitle: "Practice Area Grid",
      };
    },
  },
});
