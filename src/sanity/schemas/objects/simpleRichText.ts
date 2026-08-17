import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "simpleRichText",
  title: "Formatted Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) => rule.uri({ allowRelative: true }),
              }),
              defineField({
                name: "blank",
                title: "Open in New Tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
  ],
});
