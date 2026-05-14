import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/BackButton";

type ResetPasswordKcContext = Extract<KcContext, { pageId: "login-reset-password.ftl" }>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResetPassword({ kcContext }: { kcContext: ResetPasswordKcContext }) {
  const { url, messagesPerField } = kcContext;

  const [email, setEmail] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    document.title = "Reset your password · Starky";
  }, []);

  const clientEmailError = !email.trim()
    ? "Email is required"
    : !EMAIL_REGEX.test(email.trim())
      ? "Enter a valid email address"
      : undefined;

  const serverEmailError = messagesPerField?.existsError("username")
    ? messagesPerField.get("username")
    : undefined;

  const emailError = serverEmailError ?? (submitAttempted ? clientEmailError : undefined);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (clientEmailError) {
      e.preventDefault();
      setSubmitAttempted(true);
    }
  };

  return (
    <AuthBackground>
      <AuthCard>
        <BackButton href={url.loginUrl} />

        <div>
          <h1 style={{ fontSize: "30px", fontWeight: 700, color: "var(--color-text-dark)", marginBottom: "4px" }}>
            Reset Password
          </h1>
          <p style={{ color: "var(--color-text-mid)" }}>Enter your email address to receive a reset link</p>
        </div>

        <form aria-label="reset-password" method="POST" action={url.loginAction} onSubmit={handleSubmit} noValidate>
          <InputField
            id="username"
            label="Email Address"
            type="email"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type email"
            autoComplete="email"
            required
            error={emailError}
          />
          <div style={{ marginTop: "24px" }}>
            <PrimaryButton type="submit">Send Reset Link</PrimaryButton>
          </div>
        </form>
      </AuthCard>
    </AuthBackground>
  );
}
