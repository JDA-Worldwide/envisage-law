import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Global Settings")
        .schemaType("globalSettings")
        .child(
          S.editor().title("Global Settings").schemaType("globalSettings").documentId("globalSettings")
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      orderableDocumentListDeskItem({ type: "attorney", title: "Attorneys", S, context }),
      orderableDocumentListDeskItem({ type: "staffMember", title: "Staff Members", S, context }),
      orderableDocumentListDeskItem({ type: "practiceArea", title: "Practice Areas", S, context }),
      S.listItem()
        .title("Insights")
        .schemaType("insight")
        .child(
          S.documentTypeList("insight")
            .id("insightsByPublishedAt")
            .title("Insights")
            .apiVersion("2026-02-01")
            // Include a sentinel type so Studio does not reuse the persisted
            // "Last edited" sort stored under the `insight` schema type.
            .filter('_type in ["insight", "insightsByPublishedAt"]')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Navigation")
        .schemaType("navigation")
        .child(
          S.editor().title("Navigation").schemaType("navigation").documentId("navigation")
        ),
      S.listItem()
        .title("Footer")
        .schemaType("footer")
        .child(
          S.editor().title("Footer").schemaType("footer").documentId("footer")
        ),
      S.divider(),
      S.documentTypeListItem("formSubmission").title("Form Submissions"),
    ]);
