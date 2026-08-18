import { defineArrayMember, defineField, defineType } from "sanity";

const cellBlock = defineArrayMember({
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
            initialValue: true,
          }),
        ],
      },
    ],
  },
});

export default defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "headerRows",
      title: "Header Rows",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional source line or table title shown below the table.",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "row",
          title: "Row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "cell",
                  title: "Cell",
                  fields: [
                    defineField({
                      name: "value",
                      title: "Content",
                      type: "array",
                      of: [cellBlock],
                    }),
                  ],
                  preview: {
                    select: { text: "value.0.children.0.text" },
                    prepare({ text }) {
                      return { title: text || "Empty cell" };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              c0: "cells.0.value.0.children.0.text",
              c1: "cells.1.value.0.children.0.text",
              c2: "cells.2.value.0.children.0.text",
            },
            prepare({ c0, c1, c2 }) {
              const cells = [c0, c1, c2].filter(Boolean);
              return { title: cells.join(" · ") || "Empty row" };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).error("Add at least one row"),
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      c0: "rows.0.cells.0.value.0.children.0.text",
      c1: "rows.0.cells.1.value.0.children.0.text",
    },
    prepare({ caption, c0, c1 }) {
      const heading = [c0, c1].filter(Boolean).join(" · ");
      return {
        title: heading || "Table",
        subtitle: caption || "Table",
      };
    },
  },
});
