import type { CSSProperties, ReactNode } from "react";
import bgUrl from "../assets/bg.svg";

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "var(--color-brand-panel-bg, #360940)",
    backgroundImage: `url(${bgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
  },
};

export default function AuthBackground({ children }: { children: ReactNode }) {
  return <div style={styles.wrapper}>{children}</div>;
}
