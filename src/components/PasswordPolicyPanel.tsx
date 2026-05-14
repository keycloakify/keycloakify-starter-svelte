import type { CSSProperties } from "react";
import { evaluatePassword, passwordStrength } from "../lib/password";

type Props = {
  password: string;
  /** Email or username used to evaluate the "cannot be same as identity" rule. */
  identity?: string;
};

const wrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  fontSize: "12px",
  lineHeight: "16px",
};

const policyHeaderStyle: CSSProperties = {
  fontWeight: 500,
  color: "var(--color-text-mid, #525866)",
};

const ruleRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const ruleTextBase: CSSProperties = {
  fontSize: "12px",
  lineHeight: "16px",
};

// Vuesax — linear / tick-square style check, simplified to a checkmark inside
// a small circle. Stroke colour is driven by `passing`.
const CheckIcon = ({ passing }: { passing: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={passing ? "var(--color-success, #1FC16B)" : "var(--color-border, #cacfd8)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const STRENGTH_COLOR: Record<"weak" | "medium" | "strong", string> = {
  weak: "var(--color-error, #dc3545)",
  medium: "var(--color-warning, #f59e0b)",
  strong: "var(--color-success, #1FC16B)",
};

const STRENGTH_LABEL: Record<"weak" | "medium" | "strong", string> = {
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
};

export default function PasswordPolicyPanel({ password, identity }: Props) {
  const rules = evaluatePassword(password, identity);
  const strength = passwordStrength(password, identity);

  return (
    <div style={wrapperStyle} aria-live="polite">
      <div style={policyHeaderStyle}>
        Password Policy:{" "}
        <span style={{ color: STRENGTH_COLOR[strength], fontWeight: 700 }}>
          {STRENGTH_LABEL[strength]}
        </span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {rules.map((rule) => (
          <li key={rule.id} style={ruleRowStyle}>
            <CheckIcon passing={rule.pass} />
            <span
              style={{
                ...ruleTextBase,
                color: rule.pass
                  ? "var(--color-text-dark, #0e121b)"
                  : "var(--color-text-mid, #525866)",
              }}
            >
              {rule.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
