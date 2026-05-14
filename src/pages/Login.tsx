import { useEffect, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import SplitLayout from "../components/SplitLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import ConfirmEmail from "./ConfirmEmail";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorBannerStyle: CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "#fff5f5",
  border: "1px solid #fed7d7",
  borderRadius: "var(--input-radius, 6px)",
  color: "var(--color-error, #dc3545)",
  fontSize: "14px",
  lineHeight: "1.5",
};

const heroTitleStyle: CSSProperties = {
  fontSize: "34px",
  lineHeight: "44px",
  fontWeight: 700,
  color: "var(--color-text-dark, #000)",
  margin: 0,
};

const heroSubtitleStyle: CSSProperties = {
  fontSize: "18px",
  lineHeight: "26px",
  color: "var(--color-text-dark, #000)",
  marginTop: "4px",
};

const sectionHeadingStyle: CSSProperties = {
  fontSize: "30px",
  lineHeight: "40px",
  fontWeight: 700,
  color: "var(--color-text-dark, #000)",
  margin: 0,
};

const forgotLinkStyle: CSSProperties = {
  fontSize: "15px",
  color: "var(--color-text-light, #abb7c2)",
  fontWeight: 500,
};

export default function Login({ kcContext }: { kcContext: LoginKcContext }) {
  const { url, realm, login, messagesPerField, message } = kcContext;

  const [username, setUsername] = useState(login.username ?? "");
  const [password, setPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    document.title = "Sign in · boXe";
  }, []);

  const clientErrors = {
    username: !username.trim()
      ? "Email is required"
      : !EMAIL_REGEX.test(username.trim())
        ? "Enter a valid email address"
        : undefined,
    password: password ? undefined : "Password is required",
  };

  const isFormValid = !clientErrors.username && !clientErrors.password;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isFormValid) {
      e.preventDefault();
      setSubmitAttempted(true);
    }
  };

  // Keycloak's reset-credentials flow redirects back to login.ftl with a non-error
  // info/success message in privacy-mode configs. Treat that as the ConfirmEmail
  // state so the user gets the confirmation screen instead of a silent return.
  const summaryLower = (message?.summary ?? "").toLowerCase();
  const isPostResetEmailSent =
    !!message &&
    message.type !== "error" &&
    summaryLower.includes("email") &&
    (summaryLower.includes("shortly") ||
      summaryLower.includes("sent") ||
      summaryLower.includes("receive") ||
      summaryLower.includes("instructions"));

  if (isPostResetEmailSent) {
    return (
      <ConfirmEmail
        loginUrl={url.loginUrl}
        resendUrl={url.loginResetCredentialsUrl ?? url.loginUrl}
      />
    );
  }

  const usernameMsg = messagesPerField.existsError("username") ? messagesPerField.get("username") : "";
  const passwordMsg = messagesPerField.existsError("password") ? messagesPerField.get("password") : "";

  // Keycloak attaches the same "invalid credentials" message to both fields.
  // Collapse that case into a single banner; keep per-field text only when errors differ.
  const isCredentialError = !!usernameMsg && usernameMsg === passwordMsg;

  const usernameError =
    (isCredentialError ? undefined : usernameMsg || undefined) ??
    (submitAttempted ? clientErrors.username : undefined);
  const passwordError =
    (isCredentialError ? undefined : passwordMsg || undefined) ??
    (submitAttempted ? clientErrors.password : undefined);

  const bannerText = isCredentialError
    ? usernameMsg
    : !usernameMsg && !passwordMsg && message?.type === "error"
      ? message.summary
      : undefined;

  return (
    <SplitLayout
      panelPrompt="Not registered yet?"
      panelCtaLabel="Sign Up"
      panelCtaHref={realm.registrationAllowed ? url.registrationUrl : url.loginUrl}
    >
      <div style={{ maxWidth: "488px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h1 style={heroTitleStyle}>Log in to manage your store</h1>
          <p style={heroSubtitleStyle}>Welcome Back!</p>
        </div>

        <h2 style={sectionHeadingStyle}>Sign In</h2>

        {bannerText && <div style={errorBannerStyle}>{bannerText}</div>}

        <form aria-label="login" method="POST" action={url.loginAction} onSubmit={handleSubmit} noValidate>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <InputField
              id="username"
              label="Email Address"
              type="email"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="example@email.com"
              autoComplete="email"
              required
              error={usernameError}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="current-password"
              required
              error={passwordError}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "32px" }}>
            <PrimaryButton type="submit" width="263px">
              Sign In
            </PrimaryButton>
            {realm.resetPasswordAllowed && (
              <a href={url.loginResetCredentialsUrl} style={forgotLinkStyle}>
                Forget Password?
              </a>
            )}
          </div>
        </form>
      </div>
    </SplitLayout>
  );
}
