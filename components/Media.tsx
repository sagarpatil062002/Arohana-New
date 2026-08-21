import type { MediaRef } from "@/lib/content";

type MediaProps = {
  media: MediaRef;
  /** aspect ratio, e.g. "4 / 3", "16 / 9", "3 / 4" */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** rounded corners size */
  rounded?: "sm" | "md" | "lg";
};

const radiusMap = {
  sm: "var(--r-sm)",
  md: "var(--r-md)",
  lg: "var(--r-lg)",
};

/**
 * Renders a real <img> when `media.src` is set, otherwise a clearly-marked
 * placeholder describing the intended real asset. This keeps the layout
 * intact and makes it obvious where real photography must be dropped in —
 * without ever fabricating imagery.
 */
export default function Media({
  media,
  ratio = "4 / 3",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = "lg",
}: MediaProps) {
  const style = {
    aspectRatio: ratio,
    borderRadius: radiusMap[rounded],
  } as React.CSSProperties;

  if (media.src) {
    return (
      <figure className={`media ${className ?? ""}`} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={media.alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </figure>
    );
  }

  return (
    <figure
      className={`media placeholder-frame ${className ?? ""}`}
      style={style}
      role="img"
      aria-label={media.alt}
    >
      <span className="placeholder">
        <span className="placeholder__tag">Image placeholder</span>
        <span className="placeholder__label">{media.label}</span>
        <span className="placeholder__note">Replace with approved real asset</span>
      </span>
    </figure>
  );
}
