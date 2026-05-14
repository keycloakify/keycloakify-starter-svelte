import { useEffect, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import SplitLayout from "../components/SplitLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import InfoPopover from "../components/InfoPopover";
import { PASSWORD_RULES, getFirstPasswordError } from "../lib/password";

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

const errorBannerStyle: CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "#fff5f5",
  border: "1px solid #fed7d7",
  borderRadius: "var(--input-radius, 6px)",
  color: "var(--color-error, #dc3545)",
  fontSize: "14px",
  lineHeight: "1.5",
};

const FIELD_NAMES = ["firstName", "lastName", "email", "password", "password-confirm"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requirementsListStyle: CSSProperties = {
  listStyle: "disc",
  padding: "0 0 0 18px",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const PasswordRequirements = () => (
  <ul style={requirementsListStyle}>
    {PASSWORD_RULES.map((rule) => (
      <li key={rule.id}>{rule.text}</li>
    ))}
  </ul>
);

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

const termsTextStyle: CSSProperties = {
  marginTop: "20px",
  fontSize: "15px",
  color: "var(--color-text-mid, #696464)",
};

const termsLinkStyle: CSSProperties = {
  color: "var(--color-accent-green, #23a55a)",
  fontWeight: 600,
};

export default function Register({ kcContext }: { kcContext: RegisterKcContext }) {
  const { url, messagesPerField, message } = kcContext;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    document.title = "Create your account · boXe";
  }, []);

  const clientErrors = {
    firstName: firstName.trim() ? undefined : "First name is required",
    lastName: lastName.trim() ? undefined : "Last name is required",
    email: !email.trim()
      ? "Email is required"
      : !EMAIL_REGEX.test(email.trim())
        ? "Enter a valid email address"
        : undefined,
    password: getFirstPasswordError(password, email.trim()),
  };

  const isFormValid = Object.values(clientErrors).every((err) => !err);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isFormValid) {
      e.preventDefault();
      setSubmitAttempted(true);
    }
  };

  const errorFor = (field: string) =>
    messagesPerField.existsError(field) ? messagesPerField.get(field) : undefined;

  // Server-side errors win; otherwise after a failed submit, surface the
  // client-side message so the user sees one corrective hint per field.
  const firstNameError = errorFor("firstName") ?? (submitAttempted ? clientErrors.firstName : undefined);
  const lastNameError = errorFor("lastName") ?? (submitAttempted ? clientErrors.lastName : undefined);
  const emailError = errorFor("email") ?? (submitAttempted ? clientErrors.email : undefined);

  const serverPasswordError = messagesPerField.existsError("password", "password-confirm")
    ? messagesPerField.getFirstError("password", "password-confirm")
    : undefined;
  const passwordError =
    serverPasswordError ?? (submitAttempted ? clientErrors.password : undefined);

  const showGlobalError =
    message?.type === "error" && !messagesPerField.existsError(...FIELD_NAMES);

  return (
    <SplitLayout panelPrompt="Already a user?" panelCtaLabel="Sign In" panelCtaHref={url.loginUrl}>
      <div style={{ maxWidth: "488px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h1 style={heroTitleStyle}>Start Building Your Store</h1>
          <p style={heroSubtitleStyle}>Create account as a Storeowner</p>
        </div>

        <h2 style={sectionHeadingStyle}>Sign Up</h2>

        {showGlobalError && <div style={errorBannerStyle}>{message!.summary}</div>}

        <form aria-label="register" method="POST" action={url.registrationAction} onSubmit={handleSubmit} noValidate>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <InputField
                id="firstName"
                label="First Name"
                type="text"
                name="firstName"
                placeholder="Jack"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={firstNameError}
              />
              <InputField
                id="lastName"
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Albert"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={lastNameError}
              />
            </div>

            <InputField
              id="email"
              label="Email Address"
              type="email"
              name="email"
              placeholder="example@email.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              labelExtra={
                <InfoPopover triggerLabel="Show password requirements">
                  <PasswordRequirements />
                </InfoPopover>
              }
            />
            <input type="hidden" name="password-confirm" value={password} />
          </div>

          <div style={{ marginTop: "32px" }}>
            <PrimaryButton type="submit" width="263px">
              Sign Up
            </PrimaryButton>
          </div>

          <p style={termsTextStyle}>
            By continuing, you agree to boXe&rsquo;s{" "}
            <a href="#" style={termsLinkStyle}>
              Terms &amp; Privacy Policy.
            </a>
          </p>
        </form>
      </div>
    </SplitLayout>
  );
}
