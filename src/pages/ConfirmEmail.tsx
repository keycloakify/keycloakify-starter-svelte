import { useEffect } from "react";
import type { CSSProperties } from "react";
import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import boxeLogoUrl from "../assets/boxe-logo.svg";
import emailCheckUrl from "../assets/email-check.svg";

type Props = {
  loginUrl: string;
  resendUrl: string;
};

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
  iconWrap: {
    marginTop: "40px",
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    backgroundColor: "rgba(195, 153, 213, 0.32)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inboxHeading: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--color-primary, #3b0a45)",
  },
  inboxBody: {
    marginTop: "8px",
    fontSize: "14px",
    color: "var(--color-text-mid, #696464)",
    maxWidth: "260px",
  },
  resend: {
    marginTop: "44px",
    fontSize: "15px",
    fontWeight: 700,
    color: "var(--color-text-dark, #000)",
  },
  resendLink: {
    color: "var(--color-accent-green, #23a55a)",
    fontWeight: 700,
    marginLeft: "6px",
  },
  divider: {
    marginTop: "32px",
    width: "364px",
    maxWidth: "100%",
    height: "1px",
    backgroundColor: "rgba(0,0,0,0.08)",
    border: "none",
  },
  footTitle: {
    marginTop: "24px",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--color-text-dark, #000)",
  },
  footBody: {
    marginTop: "6px",
    fontSize: "13px",
    color: "var(--color-text-mid, #696464)",
  },
};

export default function ConfirmEmail({ resendUrl }: Props) {
  useEffect(() => {
    document.title = "Verify your email · boXe";
  }, []);

  return (
    <AuthBackground>
      <AuthCard variant="muted" style={styles.card}>
        <img src={boxeLogoUrl} alt="boXe" style={styles.logo} />
        <h1 style={styles.heading}>Verify Your Email</h1>
        <p style={styles.subtitle}>We&rsquo;ve sent a verification link to your Email</p>

        <div style={styles.iconWrap}>
          <img src={emailCheckUrl} alt="" width={48} height={48} />
        </div>
        <p style={styles.inboxHeading}>Check your Inbox</p>
        <p style={styles.inboxBody}>Click the link we sent to complete your account setup</p>

        <p style={styles.resend}>
          Didn&rsquo;t get the email?
          <a href={resendUrl} style={styles.resendLink}>
            Resend Link
          </a>
        </p>

        <hr style={styles.divider} />
        <p style={styles.footTitle}>Didn&rsquo;t receive the email?</p>
        <p style={styles.footBody}>Check your spam or junk folder &amp; Make sure your email address is correct</p>
      </AuthCard>
    </AuthBackground>
  );
}
