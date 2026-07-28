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
      description: "e.g. 919.268.8998 — the tel: link is generated automatically",
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
      name: "cookieConsentMessage",
      title: "Cookie Consent Message",
      type: "text",
      rows: 3,
      description: "Banner text shown to first-time visitors. Leave blank to hide the banner.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
