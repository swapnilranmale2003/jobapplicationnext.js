type BrandMarkProps = {
  size?: number;
  className?: string;
  inverse?: boolean;
};

/** ApplyWise monogram: an "A" whose crossbar doubles as a forward stroke. */
export function BrandMark({ size = 28, className, inverse = false }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <rect width="28" height="28" rx="6" fill={inverse ? "rgb(255 255 255 / 0.14)" : "#0b1f3a"} />
      <path d="M8 20.5 14 7.5l6 13" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.6 16h8.9" stroke="#60a5fa" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
