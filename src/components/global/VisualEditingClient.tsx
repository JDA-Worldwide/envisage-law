"use client";

import { VisualEditing } from "next-sanity/visual-editing";

/**
 * Wrapper around VisualEditing for the Presentation tool.
 *
 * Rendered only in draft mode (when SanityLive is NOT active)
 * so there's no double-refresh conflict. Uses the default refresh
 * handler which calls router.refresh() to show live draft changes.
 */
export default function VisualEditingClient() {
  return <VisualEditing />;
}
