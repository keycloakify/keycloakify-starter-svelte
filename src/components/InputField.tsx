import { useState } from "react";
import type { CSSProperties, ChangeEvent, ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  /** Optional adornment rendered to the right of the label (e.g. an info popover). */
  labelExtra?: ReactNode;
};

const wrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const labelStyle: CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  color: "var(--color-text-dark, #000)",
};

const inputWrapperStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const baseInputStyle: CSSProperties = {
  width: "100%",
  height: "var(--input-height, 45px)",
  border: "1px solid transparent",
  borderRadius: "var(--input-radius, 6px)",
  padding: "0 var(--input-padding-x, 20px)",
  fontSize: "15px",
  color: "var(--color-text-mid, #696464)",
  outline: "none",
  backgroundColor: "var(--color-input-bg, #f4f1f4)",
};

const errorStyle: CSSProperties = {
  fontSize: "12px",
  color: "var(--color-error, #dc3545)",
};

const EyeOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42 13.98 8.42 12C8.42 10.02 10.02 8.42 12 8.42C13.98 8.42 15.58 10.02 15.58 12Z" />
    <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C18.82 5.8 15.53 3.72 12 3.72C8.47 3.72 5.18 5.8 2.89 9.4C1.99 10.81 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.53 9.47L9.47 14.53C8.82 13.88 8.42 12.99 8.42 12C8.42 10.02 10.02 8.42 12 8.42C12.99 8.42 13.88 8.82 14.53 9.47Z" />
    <path d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73C8.47 3.73 5.18 5.81 2.89 9.41C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77" />
    <path d="M8.42 19.53C9.56 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C20.78 8.88 20.42 8.39 20.05 7.93" />
    <path d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52" />
    <path d="M9.47 14.53L2 22" />
    <path d="M22 2L14.53 9.47" />
  </svg>
);

export default function InputField({
  id, label, type, name, defaultValue, value, onChange,
  placeholder, autoComplete, error, required, labelExtra,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;
  const isControlled = value !== undefined;

  return (
    <div style={wrapperStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
        {labelExtra}
      </div>
      <div style={inputWrapperStyle}>
        <input
          id={id}
          name={name}
          type={resolvedType}
          {...(isControlled ? { value, onChange } : { defaultValue })}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          style={{
            ...baseInputStyle,
            paddingRight: isPassword ? "44px" : "var(--input-padding-x, 20px)",
            borderColor: error ? "var(--color-error, #dc3545)" : "transparent",
          }}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: "14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-light, #abb7c2)",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
