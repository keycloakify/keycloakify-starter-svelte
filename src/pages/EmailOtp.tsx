import { useEffect } from "react";
import type { CSSProperties } from "react";
import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";

export type EmailOtpKcContext = {
  pageId: "login-email-otp.ftl";
  url: { loginAction: string };
  messagesPerField: {
    existsError: (...fields: string[]) => boolean;
    get: (field: string) => string;
  };
  message?: { type: string; summary: string };
  deviceTrustEnabled?: boolean;
  deviceTrustPermanent?: boolean;
  trustDurationUnitKey?: string;
  trustDurationValue?: number;
  trustHideNumber?: boolean;
};

const errorBannerStyle: CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "#fff5f5",
  border: "1px solid #fed7d7",
  borderRadius: "var(--input-radius, 5px)",
  color: "var(--color-error, #dc3545)",
  fontSize: "14px",
  lineHeight: "1.5",
};

const primaryButtonStyle: CSSProperties = {
  width: "100%",
  height: "var(--button-height, 48px)",
  backgroundColor: "var(--color-primary, #007bff)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--button-radius, 5px)",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  width: "100%",
  height: "var(--button-height, 48px)",
  backgroundColor: "transparent",
  color: "var(--color-text-dark)",
  border: "1px solid var(--color-border, #e1e4ea)",
  borderRadius: "var(--button-radius, 5px)",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};

export default function EmailOtp({ kcContext }: { kcContext: EmailOtpKcContext }) {
  const { url, messagesPerField, message, deviceTrustEnabled } = kcContext;

  const codeError = messagesPerField.existsError("email-otp")
    ? messagesPerField.get("email-otp")
    : undefined;

  useEffect(() => {
    document.title = "Verify email · Starky";
  }, []);

  return (
    <AuthBackground>
      <AuthCard>
        <div>
          <h1 style={{ fontSize: "30px", fontWeight: 700, color: "var(--color-text-dark)", marginBottom: "4px" }}>
            Check your email
          </h1>
          <p style={{ color: "var(--color-text-mid)" }}>
            Enter the access code we sent to your email
          </p>
        </div>

        {message && message.type === "error" && !codeError && (
          <div style={errorBannerStyle}>{message.summary}</div>
        )}

        <form aria-label="email-otp" method="POST" action={url.loginAction}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="email-otp" style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-dark)" }}>
              Access code
            </label>
            <input
              id="email-otp"
              name="email-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              dir="ltr"
              placeholder="000000"
              aria-invalid={codeError ? "true" : undefined}
              style={{
                width: "100%",
                height: "var(--input-height, 48px)",
                border: codeError ? "1px solid var(--color-error)" : "1px solid var(--color-border)",
                borderRadius: "var(--input-radius, 5px)",
                padding: "8px 16px",
                fontSize: "24px",
                textAlign: "center",
                letterSpacing: "0.5em",
                fontFamily: "var(--font-family)",
                outline: "none",
              }}
            />
            {codeError && (
              <span style={{ fontSize: "13px", color: "var(--color-error)" }}>
                {codeError}
              </span>
            )}
          </div>

          {deviceTrustEnabled && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", fontSize: "14px", color: "var(--color-text-mid)", cursor: "pointer" }}>
              <input type="checkbox" name="trust-device" value="true" />
              <span>Don't ask for a code on this device for 30 days</span>
            </label>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
            <button type="submit" name="login" style={primaryButtonStyle}>
              Verify
            </button>
            <button type="submit" name="resend-email" style={secondaryButtonStyle}>
              Resend code
            </button>
          </div>
        </form>
      </AuthCard>
    </AuthBackground>
  );
}
