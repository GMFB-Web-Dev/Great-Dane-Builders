export function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="chevron-icon" viewBox="0 0 20 34" aria-hidden="true" focusable="false">
      <path d={direction === "left" ? "M18 2 3 17l15 15" : "M2 2l15 15L2 32"} />
    </svg>
  );
}

export function InlineArrowIcon() {
  return (
    <svg className="inline-arrow-icon" viewBox="0 0 34 20" aria-hidden="true" focusable="false">
      <path d="M1 10h30M23 2l8 8-8 8" />
    </svg>
  );
}
