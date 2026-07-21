import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export interface SiteImages {
  heroParticles: string;
  courthouse: string;
  consultation: string;
  raleighSkyline: string;
}

// Fallback URLs (original Unsplash) in case Sanity images aren't uploaded yet
const FALLBACKS: SiteImages = {
  heroParticles:
    "https://images.unsplash.com/photo-1766068472262-253151e7fdf7?fm=jpg&q=80&w=2400&auto=format&fit=crop",
  courthouse:
    "https://images.unsplash.com/photo-1750365501430-395251fe4b7e?fm=jpg&q=80&w=2400&auto=format&fit=crop",
  consultation:
    "https://images.unsplash.com/photo-1758518730384-be3d205838e8?fm=jpg&q=80&w=2400&auto=format&fit=crop",
  raleighSkyline:
    "https://images.unsplash.com/photo-1676934556859-624fa21e2588?fm=jpg&q=80&w=2400&auto=format&fit=crop",
};

export async function getSiteImages(): Promise<SiteImages> {
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  const resolve = (
    field: { asset?: { _ref: string } } | undefined,
    fallback: string
  ) => {
    if (field?.asset) {
      return urlFor(field).width(2400).quality(80).auto("format").url();
    }
    return fallback;
  };

  return {
    heroParticles: resolve(settings?.heroImage, FALLBACKS.heroParticles),
    courthouse: resolve(settings?.courthouseImage, FALLBACKS.courthouse),
    consultation: resolve(settings?.consultationImage, FALLBACKS.consultation),
    raleighSkyline: resolve(
      settings?.raleighSkylineImage,
      FALLBACKS.raleighSkyline
    ),
  };
}
