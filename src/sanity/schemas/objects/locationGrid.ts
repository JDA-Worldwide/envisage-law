import { defineType, defineField, defineArrayMember } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "locationGrid",
  title: "Location Grid",
  type: "object",
  fields: [
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
      name: "locations",
      title: "Locations",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "city",
              title: "City",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. 'Primary office', 'Attorney location'",
            }),
          ],
          preview: {
            select: { title: "city", subtitle: "label" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", locations: "locations" },
    prepare({ title, locations }) {
      return {
        title: title || "Location Grid",
        subtitle: `${locations?.length ?? 0} locations`,
      };
    },
  },
});
