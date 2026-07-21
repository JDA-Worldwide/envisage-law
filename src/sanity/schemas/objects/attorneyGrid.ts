import { defineType, defineField } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "attorneyGrid",
  title: "Attorney & Staff Grid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "showStaff",
      title: "Show Staff Members",
      type: "boolean",
      description: "Include staff members below the attorneys",
      initialValue: true,
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Attorney & Staff Grid",
        subtitle: "Attorney Grid",
      };
    },
  },
});
