import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Firm Description",
      type: "text",
      rows: 3,
      description: "Short firm description shown in the brand column",
    }),
    defineField({
      name: "firmLinks",
      title: "Firm Links",
      type: "array",
      description: "Links in the 'Firm' column (e.g. About, Legal Team, Insights, Contact)",
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
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "X (Twitter)", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "locationsText",
      title: "Locations Text",
      type: "string",
      description:
        "e.g. 'Attorneys conveniently located in Raleigh, NC · Asheville, NC · Columbia, TN.'",
    }),
    defineField({
      name: "translationNotice",
      title: "Translation Notice",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "e.g. 'Envisage Law · All Rights Reserved'",
    }),
    defineField({
      name: "disclaimerText",
      title: "Disclaimer Text",
      type: "text",
      rows: 2,
      description: "Attorney advertising disclaimer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
