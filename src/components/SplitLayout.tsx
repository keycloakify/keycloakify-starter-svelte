import type { CSSProperties, ReactNode } from "react";
import bgUrl from "../assets/bg.svg";
import boxeLogoText from "../assets/boxe-login-text.svg";

type Props = {
  /** Right-side form content (white card body). */
  children: ReactNode;
  /** Prompt shown above the panel CTA, e.g. "Already a user?" */
  panelPrompt: string;
  /** CTA label on the panel button, e.g. "Sign In" or "Sign Up" */
  panelCtaLabel: string;
  /** Where the panel CTA navigates. */
  panelCtaHref: string;
};

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    backgroundColor: "var(--color-brand-panel-bg, #360940)",
    backgroundImage: `url(${bgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    padding: "40px",
    gap: "0",
  },
  panel: {
    flex: "0 0 36%",
    minWidth: "320px",
    color: "var(--color-text-on-dark)",
    padding: "0 56px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  panelTop: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "18vh",
  },
  panelLogo: {
    height: "53px",
    width: "auto",
    display: "block",
  },
  panelTagline: {
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: 600,
    color: "var(--color-text-on-dark)",
    maxWidth: "240px",
    margin: 0,
  },
  panelDivider: {
    width: "100px",
    height: "1px",
    backgroundColor: "var(--color-divider-on-dark)",
    border: "none",
    margin: "8px 0 0",
  },
  panelBottom: {
    marginTop: "auto",
    marginBottom: "32vh",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "260px",
  },
  panelPrompt: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--color-text-on-dark)",
    margin: 0,
  },
  panelCta: {
    width: "200px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--button-radius, 6px)",
    border: "1px solid var(--color-border-on-dark)",
    color: "var(--color-text-on-dark)",
    fontSize: "16px",
    fontWeight: 600,
    backgroundColor: "transparent",
    textDecoration: "none",
    cursor: "pointer",
  },
  card: {
    flex: 1,
    backgroundColor: "var(--color-surface, #fff)",
    borderRadius: "24px",
    padding: "96px 96px 96px 88px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18)",
  },
};

export default function SplitLayout({ children, panelPrompt, panelCtaLabel, panelCtaHref }: Props) {
  return (
    <div style={styles.page}>
      <aside style={styles.panel}>
        <div style={styles.panelTop}>
          <img src={boxeLogoText} alt="boxe" style={styles.panelLogo} />
          <p style={styles.panelTagline}>Start selling online in just a few minutes.</p>
          <hr style={styles.panelDivider} />
        </div>
        <div style={styles.panelBottom}>
          <p style={styles.panelPrompt}>{panelPrompt}</p>
          <a href={panelCtaHref} style={styles.panelCta}>
            {panelCtaLabel}
          </a>
        </div>
      </aside>

      <section style={styles.card}>{children}</section>
    </div>
  );
}
