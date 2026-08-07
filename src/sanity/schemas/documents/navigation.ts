import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Navigation Items",
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
              description: "e.g. /about, /legal-team, /practice-areas",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "autoPopulateChildren",
              title: "Auto-populate dropdown from Practice Areas",
              type: "boolean",
              description:
                "When enabled, dropdown items are automatically generated from Practice Area documents",
              initialValue: false,
            }),
            defineField({
              name: "dropdownHeaderLink",
              title: "Dropdown Header Link",
              type: "object",
              description: "Full-width link pinned to the top of the dropdown (e.g. Litigation)",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "href", title: "URL", type: "string", validation: (rule) => rule.required() }),
              ],
              hidden: ({ parent }) => !parent?.autoPopulateChildren,
            }),
            defineField({
              name: "dropdownFooterLink",
              title: "Dropdown Footer Link",
              type: "object",
              description: "Full-width link pinned to the bottom of the dropdown (e.g. All Practice Areas)",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "href", title: "URL", type: "string", validation: (rule) => rule.required() }),
              ],
              hidden: ({ parent }) => !parent?.autoPopulateChildren,
            }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              description: "Manual dropdown links (ignored if auto-populate is enabled)",
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
                  ],
                  preview: {
                    select: { title: "label", subtitle: "href" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      description: "e.g. 'Contact Us'",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL",
      type: "string",
      description: "e.g. /contact",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Main Navigation" };
    },
  },
});
