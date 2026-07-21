import { defineDocuments, defineLocations } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  {
    route: "/",
    filter: `_type == "page" && slug.current == "home"`,
  },
  {
    route: "/:slug",
    filter: `_type == "page" && slug.current == $slug`,
  },
  {
    route: "/legal-team/:slug",
    filter: `_type == "attorney" && slug.current == $slug`,
  },
  {
    route: "/practice-areas/:slug",
    filter: `_type == "practiceArea" && slug.current == $slug`,
  },
  {
    route: "/insights/:slug",
    filter: `_type == "insight" && slug.current == $slug`,
  },
]);

export const locations = {
  page: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
        },
      ],
    }),
  }),
  attorney: defineLocations({
    select: { title: "name", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: `/legal-team/${doc?.slug}`,
        },
        { title: "Legal Team", href: "/legal-team" },
      ],
    }),
  }),
  practiceArea: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: `/practice-areas/${doc?.slug}`,
        },
        { title: "Practice Areas", href: "/practice-areas" },
      ],
    }),
  }),
  insight: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: `/insights/${doc?.slug}`,
        },
        { title: "Insights", href: "/insights" },
      ],
    }),
  }),
  staffMember: defineLocations({
    locations: [{ title: "Legal Team", href: "/legal-team" }],
  }),
  globalSettings: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
  }),
  navigation: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
  }),
  footer: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
  }),
};
