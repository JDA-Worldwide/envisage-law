"use client";

import { VisualEditing } from "next-sanity/visual-editing";

/**
 * Wrapper around VisualEditing for the Presentation tool.
 *
 * SanityLive already handles content refresh via its subscription,
 * so we disable VisualEditing's built-in router.refresh() to prevent
 * a double-refresh on every keystroke in the Studio.
 */
export default function VisualEditingClient() {
  return <VisualEditing refresh={() => ({ update: () => {} })} />;
}
