import { defineType, defineField } from "sanity";
import { isUnique } from "@/sanity/lib/isUnique";

export default defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        isUnique,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "IP & Technology",
          "Regulatory & Healthcare",
          "Construction & Commercial",
          "Nonprofit & Ministry",
          "HOA & Community Association",
          "Data Privacy & Security",
          "Firm News",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author (Attorney)",
      type: "reference",
      to: [{ type: "attorney" }],
      description: "Select an attorney. Use Author Name Override for non-attorney authors.",
    }),
    defineField({
      name: "authorName",
      title: "Author Name Override",
      type: "string",
      description:
        "Use when the author is not an attorney in the system, e.g. a guest contributor or 'Envisage Law'",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Feature this insight at the top of the Insights page",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
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
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
      media: "featuredImage",
    },
    prepare({ title, category, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US")
        : "No date";
      return {
        title,
        subtitle: [category, formattedDate].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
