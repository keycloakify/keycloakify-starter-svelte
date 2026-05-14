import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import type { CSSProperties } from "react";
import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/BackButton";
import PasswordPolicyPanel from "../components/PasswordPolicyPanel";
import { getFirstPasswordError, isPasswordValid, passwordsMatch } from "../lib/password";

type UpdatePasswordKcContext = Extract<KcContext, { pageId: "login-update-password.ftl" }>;

const errorBannerStyle: CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "#fff5f5",
  border: "1px solid #fed7d7",
  borderRadius: "var(--input-radius, 5px)",
  color: "var(--color-error, #dc3545)",
  fontSize: "14px",
  lineHeight: "1.5",
};

export default function UpdatePassword({ kcContext }: { kcContext: UpdatePasswordKcContext }) {
  const { url, messagesPerField, message, auth } = kcContext;
  const identity = auth?.attemptedUsername;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    document.title = "Set a new password · Starky";
  }, []);

  const matches = passwordsMatch(password, confirm);
  const formValid = isPasswordValid(password, identity) && matches;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!formValid) {
      e.preventDefault();
      setSubmitAttempted(true);
    }
  };

  // Server-supplied errors win. Otherwise, on a failed submit, surface the first
  // failing rule's message in the order defined by PASSWORD_RULES.
  const serverNewError = messagesPerField.existsError("password-new", "password-confirm")
    ? messagesPerField.get("password-new")
    : undefined;
  const newPasswordError =
    serverNewError ?? (submitAttempted ? getFirstPasswordError(password, identity) : undefined);

  const serverConfirmError = messagesPerField.existsError("password-confirm")
    ? messagesPerField.get("password-confirm")
    : undefined;
  const confirmPasswordError =
    serverConfirmError ??
    (submitAttempted && isPasswordValid(password, identity) && !matches
      ? "Passwords do not match"
      : undefined);

  return (
    <AuthBackground>
      <AuthCard>
        <BackButton href={url.loginUrl} />

        <div>
          <h1 style={{ fontSize: "30px", fontWeight: 700, color: "var(--color-text-dark)", lineHeight: "32px", marginBottom: "8px" }}>
            Create New Password
          </h1>
          <p style={{ color: "var(--color-text-mid)", lineHeight: "20px" }}>Enter your new password to complete the reset</p>
        </div>

        {message && message.type === "error" && !messagesPerField.existsError("password-new", "password-confirm") && (
          <div style={errorBannerStyle}>{message.summary}</div>
        )}

        <form aria-label="update-password" method="POST" action={url.loginAction} onSubmit={handleSubmit} noValidate>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <InputField
              id="password-new"
              label="New Password"
              type="password"
              name="password-new"
              placeholder="Type new password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={newPasswordError}
            />

            <PasswordPolicyPanel password={password} identity={identity} />

            <InputField
              id="password-confirm"
              label="Confirm Password"
              type="password"
              name="password-confirm"
              placeholder="Re-type password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={confirmPasswordError}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <PrimaryButton type="submit">Update Password</PrimaryButton>
          </div>
        </form>
      </AuthCard>
    </AuthBackground>
  );
}
