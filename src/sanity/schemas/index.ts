import type { SchemaTypeDefinition } from "sanity";

// Documents
import globalSettings from "./documents/globalSettings";
import page from "./documents/page";
import insight from "./documents/blogPost";
import attorney from "./documents/attorney";
import staffMember from "./documents/staffMember";
import practiceArea from "./documents/practiceArea";
import navigation from "./documents/navigation";
import footer from "./documents/footer";
import formSubmission from "./documents/formSubmission";

// Objects
import link from "./objects/link";
import seo from "./objects/seo";
import textBlock from "./objects/textBlock";
import featureGrid from "./objects/featureGrid";
import imageGallery from "./objects/imageGallery";
import videoEmbed from "./objects/videoEmbed";
import statsCounter from "./objects/statsCounter";
import logoBar from "./objects/logoBar";
import testimonials from "./objects/testimonials";
import faq from "./objects/faq";
import contactForm from "./objects/contactForm";
import ctaButton from "./objects/ctaButton";
import pageBuilder from "./objects/pageBuilder";
import attorneyGrid from "./objects/attorneyGrid";
import practiceAreaGrid from "./objects/practiceAreaGrid";
import anchoringAttorneyBand from "./objects/anchoringAttorneyBand";
import contactMethods from "./objects/contactMethods";
import ctaBand from "./objects/ctaBand";
import envisageHero from "./objects/envisageHero";
import richTextSection from "./objects/richTextSection";
import textImageSplit from "./objects/textImageSplit";
import highlightGrid from "./objects/highlightGrid";
import insightsGrid from "./objects/insightsGrid";
import recognitionBand from "./objects/recognitionBand";
import locationGrid from "./objects/locationGrid";
import imageBand from "./objects/imageBand";
import simpleRichText from "./objects/simpleRichText";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  globalSettings,
  page,
  insight,
  attorney,
  staffMember,
  practiceArea,
  navigation,
  footer,
  formSubmission,

  // Objects
  link,
  seo,
  textBlock,
  featureGrid,
  imageGallery,
  videoEmbed,
  statsCounter,
  logoBar,
  testimonials,
  faq,
  contactForm,
  ctaButton,
  pageBuilder,
  attorneyGrid,
  practiceAreaGrid,
  anchoringAttorneyBand,
  contactMethods,
  ctaBand,
  envisageHero,
  richTextSection,
  textImageSplit,
  highlightGrid,
  insightsGrid,
  recognitionBand,
  locationGrid,
  imageBand,
  simpleRichText,
];
