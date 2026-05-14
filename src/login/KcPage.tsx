import { lazy, Suspense } from "react";
import type { KcContext } from "keycloakify/login/KcContext";
import type { EmailOtpKcContext } from "../pages/EmailOtp";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const UpdatePassword = lazy(() => import("../pages/UpdatePassword"));
const Info = lazy(() => import("../pages/Info"));
const LoginOtp = lazy(() => import("../pages/LoginOtp"));
const EmailOtp = lazy(() => import("../pages/EmailOtp"));

// The email-otp-authenticator SPI introduces a pageId Keycloakify's KcContext
// union does not know about, so it's threaded through as an extension here.
type ExtendedKcContext = KcContext | EmailOtpKcContext;

export default function KcPage({ kcContext }: { kcContext: ExtendedKcContext }) {
  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return <Login kcContext={kcContext} />;
          case "register.ftl":
            return <Register kcContext={kcContext} />;
          case "login-reset-password.ftl":
            return <ResetPassword kcContext={kcContext} />;
          case "login-update-password.ftl":
            return <UpdatePassword kcContext={kcContext} />;
          case "info.ftl":
            return <Info kcContext={kcContext} />;
          case "login-otp.ftl":
            return <LoginOtp kcContext={kcContext} />;
          case "login-email-otp.ftl":
            return <EmailOtp kcContext={kcContext} />;
          default:
            return null;
        }
      })()}
    </Suspense>
  );
}
