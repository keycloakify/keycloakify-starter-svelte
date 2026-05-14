import { useEffect } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import PrimaryButton from "../components/PrimaryButton";

type OtpKcContext = Extract<KcContext, { pageId: "login-otp.ftl" }>;

export default function LoginOtp({ kcContext }: { kcContext: OtpKcContext }) {
  const { url } = kcContext;

  useEffect(() => {
    document.title = "Verify your identity · Starky";
  }, []);

  return (
    <AuthBackground>
      <AuthCard>
        <div>
          <h1 style={{ fontSize: "30px", fontWeight: 700, color: "var(--color-text-dark)", marginBottom: "4px" }}>
            Verify your identity
          </h1>
          <p style={{ color: "var(--color-text-mid)" }}>Enter the code from your authenticator app</p>
        </div>

        <form aria-label="otp" method="POST" action={url.loginAction}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="otp"
              style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-dark)" }}
            >
              One-time code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoComplete="one-time-code"
              autoFocus
              placeholder="000000"
              style={{
                width: "100%",
                height: "var(--input-height, 48px)",
                border: "1px solid var(--color-border, #e1e4ea)",
                borderRadius: "var(--input-radius, 5px)",
                padding: "8px 16px",
                fontSize: "24px",
                textAlign: "center",
                letterSpacing: "0.5em",
                fontFamily: "var(--font-family)",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginTop: "24px" }}>
            <PrimaryButton type="submit">Verify</PrimaryButton>
          </div>
        </form>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          <a href={url.loginUrl} style={{ color: "var(--color-primary)" }}>
            Use a different method
          </a>
        </p>
      </AuthCard>
    </AuthBackground>
  );
}
