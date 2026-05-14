import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const triggerStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  padding: 0,
  background: "none",
  border: "none",
  borderRadius: "50%",
  color: "var(--color-text-mid, #525866)",
  cursor: "pointer",
};

const popoverStyle: CSSProperties = {
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  zIndex: 10,
  minWidth: "220px",
  padding: "10px 12px",
  backgroundColor: "var(--color-surface, #fff)",
  border: "1px solid var(--color-border, #e1e4ea)",
  borderRadius: "6px",
  boxShadow: "0 4px 12px rgba(14, 18, 27, 0.12)",
  fontSize: "12px",
  lineHeight: "16px",
  color: "var(--color-text-dark, #0e121b)",
  whiteSpace: "normal",
};

const wrapperStyle: CSSProperties = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
};

// Vuesax — linear / info-circle (dot on top, stem below — the "i" glyph)
const InfoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
    <path d="M12 16V11" />
    <path d="M11.9946 8H12.0036" strokeWidth="2" />
  </svg>
);

type Props = {
  /** Accessible label for the trigger button (e.g. "Show password requirements"). */
  triggerLabel: string;
  /** Popover body content. */
  children: ReactNode;
};

export default function InfoPopover({ triggerLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <span ref={wrapperRef} style={wrapperStyle}>
      <button
        type="button"
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={() => setOpen((v) => !v)}
        style={triggerStyle}
      >
        <InfoIcon />
      </button>
      {open && (
        <div id={popoverId} role="tooltip" style={popoverStyle}>
          {children}
        </div>
      )}
    </span>
  );
}
