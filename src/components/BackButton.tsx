import type { CSSProperties } from "react";

const style: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--color-text-mid, #525866)",
  padding: 0,
  textDecoration: "none",
};

export default function BackButton({ href }: { href: string }) {
  return (
    <a href={href} style={style}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back
    </a>
  );
}
