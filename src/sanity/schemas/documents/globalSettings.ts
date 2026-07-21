import { defineType, defineField } from "sanity";

export default defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Display format, e.g. 919.268.8998",
    }),
    defineField({
      name: "phoneTel",
      title: "Phone (tel link)",
      type: "string",
      description: "tel: format for click-to-call, e.g. 9192688998",
    }),
    defineField({
      name: "mailingAddress",
      title: "Mailing Address",
      type: "text",
      rows: 3,
      description: "Full mailing address, displayed on the contact page",
    }),
    defineField({
      name: "lawpayUrl",
      title: "LawPay URL",
      type: "url",
      description: "Online payment portal link",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Default hero/banner background used across the site",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "courthouseImage",
      title: "Courthouse Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Courthouse/credibility band background",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "consultationImage",
      title: "Consultation Background Image",
      type: "image",
      options: { hotspot: true },
      description: "CTA band and about page background",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "raleighSkylineImage",
      title: "Raleigh Skyline Image",
      type: "image",
      options: { hotspot: true },
      description: "Contact page background",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  "facebook",
                  "twitter",
                  "instagram",
                  "linkedin",
                  "youtube",
                  "tiktok",
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
        },
      ],
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
