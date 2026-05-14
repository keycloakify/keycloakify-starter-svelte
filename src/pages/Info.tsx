import { useEffect } from "react";
import type { CSSProperties } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import ConfirmEmail from "./ConfirmEmail";
import boxeLogoUrl from "../assets/boxe-logo.svg";
import verifiedBadgeUrl from "../assets/verified-badge.svg";

type InfoKcContext = Extract<KcContext, { pageId: "info.ftl" }>;

const styles: Record<string, CSSProperties> = {
  card: {
    maxWidth: "604px",
    padding: "56px 64px",
    alignItems: "center",
    textAlign: "center",
    gap: "0",
  },
  logo: { height: "60px", width: "auto", marginBottom: "32px" },
  heading: {
    fontSize: "30px",
    lineHeight: "40px",
    fontWeight: 700,
    color: "var(--color-text-dark, #000)",
    margin: 0,
  },
  subtitle: {
    fontSize: "15px",
    color: "var(--color-text-mid, #696464)",
    marginTop: "8px",
  },
  badge: { marginTop: "40px", width: "104px", height: "104px" },
  successHeading: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--color-primary, #3b0a45)",
  },
  body: {
    marginTop: "8px",
    fontSize: "14px",
    color: "var(--color-text-mid, #696464)",
    maxWidth: "260px",
  },
  continueButton: {
    marginTop: "40px",
    height: "48px",
    minWidth: "180px",
    padding: "0 28px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    backgroundColor: "var(--color-primary, #3b0a45)",
    color: "#fff",
    borderRadius: "var(--button-radius, 6px)",
    fontSize: "16px",
    fontWeight: 600,
    textDecoration: "none",
  },
};

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Info({ kcContext }: { kcContext: InfoKcContext }) {
  const { url, messageHeader, message, actionUri } = kcContext;

  const isSuccess = message?.type === "success";

  const summaryLower = (message?.summary ?? "").toLowerCase();
  const headerLower = (messageHeader ?? "").toLowerCase();
  const isEmailSent =
    !isSuccess &&
    (headerLower.includes("email") ||
      summaryLower.includes("email") ||
      summaryLower.includes("shortly"));

  useEffect(() => {
    if (isEmailSent) return; // ConfirmEmail sets its own title
    const title = isSuccess ? "Email verified · boXe" : "Account · boXe";
    document.title = title;
  }, [isSuccess, isEmailSent]);

  if (isEmailSent) {
    return <ConfirmEmail loginUrl={url.loginUrl} resendUrl={url.loginRestartFlowUrl} />;
  }

  if (isSuccess) {
    return (
      <AuthBackground>
        <AuthCard variant="white" style={styles.card}>
          <img src={boxeLogoUrl} alt="boXe" style={styles.logo} />
          <h1 style={styles.heading}>Email Verified</h1>
          <p style={styles.subtitle}>Congratulations! Your account is verified</p>

          <img src={verifiedBadgeUrl} alt="" style={styles.badge} />

          <p style={styles.successHeading}>You&rsquo;re Verified!</p>
          <p style={styles.body}>Your email is confirmed and your store is ready to manage.</p>

          <a href={url.loginUrl} style={styles.continueButton}>
            Continue <ArrowRight />
          </a>
        </AuthCard>
      </AuthBackground>
    );
  }

  return (
    <AuthBackground>
      <AuthCard variant="white" style={styles.card}>
        <img src={boxeLogoUrl} alt="boXe" style={styles.logo} />
        <h1 style={styles.heading}>{messageHeader ?? "Information"}</h1>
        <p style={styles.subtitle}>{message?.summary ?? ""}</p>

        <a href={actionUri ?? url.loginUrl} style={styles.continueButton}>
          Continue <ArrowRight />
        </a>
      </AuthCard>
    </AuthBackground>
  );
}
