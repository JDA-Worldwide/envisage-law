import Container from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import type { ImageBandProps } from "./types";

export default function ImageBand({
  image,
  heading,
  height = 420,
}: ImageBandProps) {
  const bgUrl = image?.asset
    ? urlFor(image).width(2400).quality(80).auto("format").url()
    : "";

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,31,70,0.85)] via-[rgba(0,31,70,0.55)] to-[rgba(0,31,70,0.35)]" />
      {heading && (
        <Container className="relative z-[2]">
          <p
            className="text-[clamp(24px,3.2vw,38px)] font-extrabold leading-[1.15] text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </Container>
      )}
    </section>
  );
}
