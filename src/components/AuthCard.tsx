import type { CSSProperties, ReactNode } from "react";

type Variant = "white" | "muted";

const baseStyle: CSSProperties = {
  width: "100%",
  maxWidth: "var(--card-width, 482px)",
  borderRadius: "var(--card-radius, 20px)",
  padding: "var(--card-padding, 48px)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18)",
};

const variantStyles: Record<Variant, CSSProperties> = {
  white: { backgroundColor: "var(--color-surface, #fff)" },
  muted: { backgroundColor: "var(--color-surface-muted, #e6dfe6)" },
};

export default function AuthCard({
  children,
  style,
  variant = "white",
}: {
  children: ReactNode;
  style?: CSSProperties;
  variant?: Variant;
}) {
  return (
    <div className="auth-card" style={{ ...baseStyle, ...variantStyles[variant], ...style }}>
      {children}
    </div>
  );
}
