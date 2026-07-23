import { defineType, defineField } from "sanity";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "imageBand",
  title: "Image Band",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Overlay Heading",
      type: "string",
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "number",
      description: "Height in pixels (default 420)",
      initialValue: 420,
    }),
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare({ title, media }) {
      return {
        title: title || "Image Band",
        subtitle: "Image Band",
        media,
      };
    },
  },
});
