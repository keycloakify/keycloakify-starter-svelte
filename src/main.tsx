import "./styles/global.css";
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import faviconUrl from "./assets/favicon.svg";

const faviconLink = document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/svg+xml";
faviconLink.href = faviconUrl;
document.head.appendChild(faviconLink);

const KcPage = lazy(() => import("./login/KcPage"));

// In production, window.kcContext is injected by Keycloak's FreeMarker template.
// In development (npm run dev), use ?page=<key> in the URL to preview pages.
const kcContext = (
  window as { kcContext?: import("keycloakify/login/KcContext").KcContext }
).kcContext;

type PageKey =
  | "login"
  | "register"
  | "reset"
  | "update"
  | "info"
  | "info-success"
  | "info-email"
  | "otp"
  | "email-otp";

const pageMap: Record<PageKey, { pageId: string; label: string }> = {
  login: { pageId: "login.ftl", label: "Login" },
  register: { pageId: "register.ftl", label: "Register" },
  reset: { pageId: "login-reset-password.ftl", label: "Reset" },
  update: { pageId: "login-update-password.ftl", label: "Update PW" },
  info: { pageId: "info.ftl", label: "Info" },
  "info-success": { pageId: "info.ftl", label: "Info (success)" },
  "info-email": { pageId: "info.ftl", label: "Info (email sent)" },
  otp: { pageId: "login-otp.ftl", label: "OTP" },
  "email-otp": { pageId: "login-email-otp.ftl", label: "Email OTP" },
};

// Dev-only: rewrite the URL fields the components consume so anchor links
// land on the right preview page instead of mock placeholders ("#").
const devUrlOverrides = {
  loginUrl: "?page=login",
  loginResetCredentialsUrl: "?page=reset",
  registrationUrl: "?page=register",
  loginRestartFlowUrl: "?page=reset",
};

// Dev-only: where each page's form submission should land, mirroring the
// real Keycloak flow as closely as possible. Forms post to url.loginAction
// in production; here we intercept submit and navigate instead.
const formNextPage: Record<PageKey, PageKey> = {
  login: "info-success",
  register: "info-success",
  reset: "info-email",
  update: "info-success",
  info: "login",
  "info-success": "login",
  "info-email": "login",
  otp: "info-success",
  "email-otp": "info-success",
};

function installDevFormInterceptor(pageKey: PageKey) {
  document.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const next = formNextPage[pageKey];
      if (next) window.location.assign(`?page=${next}`);
    },
    { capture: true },
  );
}

function renderDevNav(active: PageKey) {
  const nav = document.createElement("div");
  nav.style.cssText =
    "position:fixed;top:8px;left:8px;z-index:9999;background:#0e121b;color:#fff;padding:6px 8px;border-radius:6px;font:12px/1.4 system-ui,sans-serif;display:flex;gap:6px;flex-wrap:wrap;max-width:calc(100vw - 16px);box-shadow:0 4px 12px rgba(0,0,0,0.2)";
  (Object.keys(pageMap) as PageKey[]).forEach((key) => {
    const a = document.createElement("a");
    a.href = `?page=${key}`;
    a.textContent = pageMap[key].label;
    a.style.cssText = `color:${key === active ? "#7fb8ff" : "#fff"};text-decoration:none;padding:2px 6px;border-radius:4px;background:${key === active ? "rgba(127,184,255,0.15)" : "transparent"}`;
    nav.appendChild(a);
  });
  document.body.appendChild(nav);
}

if (kcContext === undefined && import.meta.env.DEV) {
  const params = new URLSearchParams(window.location.search);
  const pageKey = (params.get("page") ?? "login") as PageKey;
  const entry = pageMap[pageKey] ?? pageMap.login;

  // Email OTP isn't in Keycloakify's mock factory (third-party SPI), so
  // hand-roll a kcContext for it.
  if (entry.pageId === "login-email-otp.ftl") {
    const mock = {
      pageId: "login-email-otp.ftl" as const,
      url: { loginAction: "#", ...devUrlOverrides },
      messagesPerField: {
        existsError: () => false,
        get: () => "",
      },
      deviceTrustEnabled: true,
      trustDurationUnitKey: "unitDayMany",
      trustDurationValue: 30,
    };
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <Suspense>
          {/* @ts-expect-error — custom pageId not in KcContext union */}
          <KcPage kcContext={mock} />
        </Suspense>
      </StrictMode>
    );
    renderDevNav(pageKey);
    installDevFormInterceptor(pageKey);
  } else {
    import("keycloakify/login/KcContext")
      .then(({ createGetKcContextMock }) => {
        const { getKcContextMock } = createGetKcContextMock({
          kcContextExtension: {},
          kcContextExtensionPerPage: {},
        });

        const baseOverrides = {
          realm: {
            registrationAllowed: true,
            resetPasswordAllowed: true,
            loginWithEmailAllowed: true,
          },
          social: {
            displayInfo: true,
            providers: [
              {
                alias: "google",
                displayName: "Google",
                loginUrl: "?page=info-success",
                providerId: "google",
              },
            ],
          },
          url: devUrlOverrides,
        };

        // Info page has multiple visual states; key off the dev URL alias.
        const infoOverrides =
          pageKey === "info-success"
            ? { message: { type: "success", summary: "Your password has been reset successfully!" } }
            : pageKey === "info-email"
              ? { message: { type: "info", summary: "You should receive an email shortly with further instructions." } }
              : {};

        const mock = getKcContextMock({
          // @ts-expect-error — pageId is typed strictly by Keycloakify
          pageId: entry.pageId,
          overrides: { ...baseOverrides, ...infoOverrides },
        });

        createRoot(document.getElementById("root")!).render(
          <StrictMode>
            <Suspense>
              <KcPage kcContext={mock} />
            </Suspense>
          </StrictMode>
        );
        renderDevNav(pageKey);
        installDevFormInterceptor(pageKey);
      })
      .catch(() => {
        document.getElementById("root")!.textContent =
          "Dev mode: set window.kcContext or update main.tsx mock";
      });
  }
} else if (kcContext !== undefined) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Suspense>
        <KcPage kcContext={kcContext} />
      </Suspense>
    </StrictMode>
  );
}
