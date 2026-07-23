export interface RecognitionTier {
  _key: string;
  rank: string;
  label: string;
}

export interface RecognitionBandProps {
  year?: string;
  title: string;
  tiers?: RecognitionTier[];
}
