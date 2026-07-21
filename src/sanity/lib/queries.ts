import { groq } from "next-sanity";

// Reusable GROQ fragment — resolves a `link` object's URL from either a
// pageRef slug (internal) or a plain url string (external).
const linkFields = /* groq */ `
  "label": coalesce(label, pageRef->title),
  isExternal,
  "url": coalesce("/" + pageRef->slug.current, url)
`;

// Reusable GROQ fragment — projects a ctaButton item with resolved URL.
const ctaButtonFields = /* groq */ `
  _key,
  label,
  variant,
  isExternal,
  "url": coalesce("/" + pageRef->slug.current, url)
`;

// Inline projection for a ctas[] array of ctaButton.
export const ctasProjection = /* groq */ `ctas[] { ${ctaButtonFields} }`;

// --- Global ---

export const settingsQuery = groq`
  *[_type == "globalSettings"][0] {
    siteTitle,
    siteUrl,
    logo,
    defaultSeo,
    phone,
    phoneTel,
    mailingAddress,
    lawpayUrl,
    heroImage,
    courthouseImage,
    consultationImage,
    raleighSkylineImage,
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    "ctaLabel": coalesce(ctaLabel, ctaPage->title),
    "ctaUrl": "/" + ctaPage->slug.current,
    items[] {
      _key,
      "label": coalesce(label, pageRef->title),
      "url": select(isExternal == true => url, "/" + pageRef->slug.current),
      isExternal,
      children[] {
        _key,
        "label": coalesce(label, pageRef->title),
        "url": select(isExternal == true => url, "/" + pageRef->slug.current),
        isExternal
      }
    }
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0] {
    columns[] {
      _key,
      title,
      links[] {
        _key,
        ${linkFields}
      }
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    copyrightText
  }
`;

// --- Pages ---

export const allPagesQuery = groq`
  *[_type == "page"] {
    "slug": slug.current
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    seo,
    modules[] {
      ...,
      _type == "teamGrid" => {
        heading,
        members[]-> {
          _id,
          name,
          jobTitle,
          photo,
          bio
        }
      },
      _type == "anchoringAttorneyBand" => {
        ...,
        attorney-> {
          _id,
          name,
          "slug": slug.current,
          role,
          photo,
          email,
          phone
        }
      }
    }
  }
`;

export const homepageQuery = groq`
  *[_type == "page" && slug.current == "home"][0] {
    title,
    "slug": slug.current,
    seo,
    modules[] {
      ...,
      _type == "teamGrid" => {
        heading,
        members[]-> {
          _id,
          name,
          jobTitle,
          photo,
          bio
        }
      },
      _type == "anchoringAttorneyBand" => {
        ...,
        attorney-> {
          _id,
          name,
          "slug": slug.current,
          role,
          photo,
          email,
          phone
        }
      }
    }
  }
`;

// --- Attorneys ---

export const allAttorneysQuery = groq`
  *[_type == "attorney"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    niche,
    photo,
    email
  }
`;

export const attorneyBySlugQuery = groq`
  *[_type == "attorney" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    role,
    niche,
    photo,
    email,
    phone,
    bio,
    credentialTitle,
    credentialSubtitle,
    practiceAreaTags[] {
      _key,
      label,
      "practiceAreaSlug": practiceAreaRef->slug.current
    },
    profileSections[] {
      _key,
      _type,
      title,
      items,
      entries[] {
        _key,
        label,
        value
      }
    },
    seo
  }
`;

// --- Staff ---

export const allStaffQuery = groq`
  *[_type == "staffMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    initials
  }
`;

// --- Practice Areas ---

export const allPracticeAreasQuery = groq`
  *[_type == "practiceArea"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    icon,
    standfirst
  }
`;

export const practiceAreaBySlugQuery = groq`
  *[_type == "practiceArea" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    icon,
    standfirst,
    heroSubtitle,
    body,
    capabilities,
    featuredCapability,
    anchoringAttorney-> {
      _id,
      name,
      "slug": slug.current,
      role,
      photo,
      email,
      phone
    },
    anchoringHeading,
    anchoringRoleLabel,
    anchoringDescription,
    ctaHeading,
    seo
  }
`;

// --- Insights ---

export const allInsightsQuery = groq`
  *[_type == "insight"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    featured,
    featuredImage,
    "authorName": coalesce(author->name, authorName),
    "authorSlug": author->slug.current
  }
`;

export const insightBySlugQuery = groq`
  *[_type == "insight" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    "authorName": coalesce(author->name, authorName),
    "authorSlug": author->slug.current,
    "authorRole": author->role,
    "authorPhoto": author->photo,
    publishedAt,
    featured,
    excerpt,
    body,
    featuredImage,
    seo
  }
`;
