import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "envisageHero",
  title: "Hero",
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
      type: "array",
      description: "Bold any text to highlight it in gold",
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Highlight", value: "strong" }],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "actions",
      title: "Action Buttons",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "variant",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Teal (Primary)", value: "teal" },
                  { title: "Ghost (Outline)", value: "ghost" },
                ],
              },
              initialValue: "teal",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "breadcrumbs",
      title: "Breadcrumbs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              description: "Leave blank for the current page (last breadcrumb)",
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isHome",
      title: "Homepage Hero",
      type: "boolean",
      description: "Enables taller hero with homepage-specific styling",
      initialValue: false,
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      const text = Array.isArray(heading)
        ? heading.map((b: { children?: { text?: string }[] }) => b.children?.map((c) => c.text).join("") || "").join(" ")
        : heading || "";
      return { title: text || "Hero", subtitle: "Hero" };
    },
  },
});
