import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  /** When set, button only takes the width its content needs (plus padding). */
  fitContent?: boolean;
  /** Optional custom width (px or any CSS length). Overrides fitContent. */
  width?: string;
};

const baseStyle: CSSProperties = {
  height: "var(--button-height, 48px)",
  backgroundColor: "var(--color-primary, #3b0a45)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--button-radius, 6px)",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
  padding: "0 28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

export default function PrimaryButton({ children, type = "submit", disabled, onClick, fitContent, width }: Props) {
  const resolvedWidth = width ?? (fitContent ? "auto" : "100%");
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...baseStyle,
        width: resolvedWidth,
        backgroundColor: disabled ? "#7d6481" : "var(--color-primary, #3b0a45)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}
