// Identifies this site to Figma, which requires every embed to name its host.
const EMBED_HOST = "shafiq-effendy-portfolio";

/**
 * Figma's embed URL is the share URL on the embed subdomain, plus embed-host.
 * The share link's tracking parameter is dropped; node-id is kept so the embed
 * opens on the same page or frame the link points at.
 */
const toEmbedUrl = (shareUrl: string) => {
  const url = new URL(shareUrl);
  url.hostname = "embed.figma.com";
  url.searchParams.delete("t");
  url.searchParams.set("embed-host", EMBED_HOST);
  return url.toString();
};

export interface FigmaEmbedProps {
  /** A figma.com share link to a file, page or frame. */
  url: string;
  /** Names the frame for screen readers, and labels it above the frame. */
  title: string;
}

/**
 * A live, pannable view of a Figma file. Lazy, because each embed loads the
 * Figma viewer, and a page with several would otherwise fetch them all up front.
 */
export function FigmaEmbed({ url, title }: FigmaEmbedProps) {
  return (
    <figure className="figma-embed">
      <figcaption className="figma-embed-caption">{title}</figcaption>
      <iframe
        allowFullScreen
        className="figma-embed-frame"
        loading="lazy"
        src={toEmbedUrl(url)}
        title={`${title} (Figma file)`}
      />
    </figure>
  );
}
