export interface AnchoringAttorneyBandProps {
  eyebrow?: string;
  heading: string;
  attorney?: {
    _id: string;
    name: string;
    slug: string;
    role: string;
    photo?: unknown;
    email?: string;
    phone?: string;
  };
  roleLabel?: string;
  description?: string;
}
