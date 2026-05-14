import type { CSSProperties } from "react";

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const lineStyle: CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "var(--color-border, #e1e4ea)",
};

const textStyle: CSSProperties = {
  fontSize: "14px",
  color: "var(--color-text-light, #929292)",
  whiteSpace: "nowrap",
};

export default function Divider({ text = "or continue with" }: { text?: string }) {
  return (
    <div style={wrapperStyle}>
      <div style={lineStyle} aria-hidden="true" />
      <span style={textStyle}>{text}</span>
      <div style={lineStyle} aria-hidden="true" />
    </div>
  );
}
