import { defineType, defineField, defineArrayMember } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "contactMethods",
  title: "Contact Methods",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "methods",
      title: "Methods",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Phone", value: "phone" },
                  { title: "Map Pin", value: "mapPin" },
                  { title: "Credit Card / Payment", value: "creditCard" },
                  { title: "Email", value: "email" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. 'Call', 'Mailing Address', 'Payments'",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "text",
              rows: 3,
              description: "Main display text, e.g. phone number or address",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "Small helper text below the value",
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              description:
                "Optional: makes the card clickable. e.g. tel:9192688998 or a LawPay URL",
            }),
            defineField({
              name: "style",
              title: "Card Style",
              type: "string",
              options: {
                list: [
                  { title: "Solid", value: "solid" },
                  { title: "Dashed Border", value: "dashed" },
                ],
              },
              initialValue: "solid",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", methods: "methods" },
    prepare({ title, methods }) {
      return {
        title: title || "Contact Methods",
        subtitle: `${methods?.length ?? 0} methods`,
      };
    },
  },
});
