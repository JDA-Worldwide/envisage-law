import { defineType, defineField, defineArrayMember } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { isUnique } from "@/sanity/lib/isUnique";

export default defineType({
  name: "attorney",
  title: "Attorney",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", isUnique },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. Partner, Associate Attorney, Attorney",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "If provided, this will be displayed on the attorney's profile page",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Direct Phone",
      type: "string",
      description: "Direct line if different from firm phone, e.g. (984) 344-9191",
    }),
    defineField({
      name: "niche",
      title: "Niche / Tagline",
      type: "string",
      description:
        "Short label shown on card, e.g. 'IP & Technology' or 'Construction · Nonprofit · HOA'",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Full biography shown on the attorney detail page",
    }),
    defineField({
      name: "credentialTitle",
      title: "Credential Badge — Title",
      type: "string",
      description: "e.g. 'Board Certified Specialist'",
    }),
    defineField({
      name: "credentialSubtitle",
      title: "Credential Badge — Subtitle",
      type: "string",
      description: "e.g. 'NC State Bar · Trademark Law'",
    }),
    defineField({
      name: "practiceAreaTags",
      title: "Practice Area Tags",
      type: "array",
      description:
        "Tags shown on profile sidebar. Link to a practice area page or leave as a plain label.",
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
              name: "practiceAreaRef",
              title: "Link to Practice Area",
              type: "reference",
              to: [{ type: "practiceArea" }],
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "profileSections",
      title: "Profile Sections",
      type: "array",
      description:
        "Collapsible sections on the detail page (Court Admissions, Education, Honors, etc.)",
      of: [
        defineArrayMember({
          type: "object",
          name: "bulletList",
          title: "Bullet List Section",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare({ title, items }) {
              return {
                title,
                subtitle: `${items?.length ?? 0} items`,
              };
            },
          },
        }),
        defineArrayMember({
          type: "object",
          name: "keyValueList",
          title: "Key-Value Section",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "entries",
              title: "Entries",
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
                      name: "value",
                      title: "Value",
                      type: "text",
                      rows: 2,
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "value" },
                  },
                }),
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", entries: "entries" },
            prepare({ title, entries }) {
              return {
                title,
                subtitle: `${entries?.length ?? 0} entries`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "badges",
      title: "Badges & Certifications",
      type: "array",
      description: "Certification or recognition badge images (e.g. Board Certified Specialist, Super Lawyers)",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "superLawyersUrl",
      title: "Super Lawyers Profile URL",
      type: "url",
      description:
        "Paste the Super Lawyers profile URL to display the badge widget (e.g. https://profiles.superlawyers.com/…)",
    }),
    orderRankField({ type: "attorney" }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
