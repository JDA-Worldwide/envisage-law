import { defineType, defineField } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "anchoringAttorneyBand",
  title: "Anchoring Attorney Band",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the heading, e.g. 'Anchoring Attorney'",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attorney",
      title: "Attorney",
      type: "reference",
      to: [{ type: "attorney" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roleLabel",
      title: "Role Label Override",
      type: "string",
      description:
        "Custom role line for this context, e.g. 'Partner · NC Board Certified Specialist, Trademark Law'",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Context-specific description of the attorney for this section",
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", attorney: "attorney.name" },
    prepare({ title, attorney }) {
      return {
        title: title || "Anchoring Attorney Band",
        subtitle: attorney || "No attorney selected",
      };
    },
  },
});
