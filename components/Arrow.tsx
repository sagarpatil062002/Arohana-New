type ArrowProps = {
  className?: string;
  size?: number;
};

/** Minimal editorial arrow used in CTAs and links. */
export default function Arrow({ className, size = 16 }: ArrowProps) {
  return (
    <svg
      className={`arrow ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
