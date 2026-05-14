import { render, screen } from "@testing-library/react";
import type { KcContext } from "keycloakify/login/KcContext";
import LoginOtp from "../../pages/LoginOtp";

type OtpKcContext = Extract<KcContext, { pageId: "login-otp.ftl" }>;

const mockKcContext = {
  pageId: "login-otp.ftl" as const,
  url: {
    loginAction: "https://auth.example.com/otp-action",
    loginUrl: "https://auth.example.com/login",
  },
  otpLogin: {
    userOtpCredentials: [],
    selectedCredentialId: "",
  },
} as unknown as OtpKcContext;

describe("LoginOtp page", () => {
  it("renders the Verify Your Identity heading", () => {
    render(<LoginOtp kcContext={mockKcContext} />);
    expect(screen.getByRole("heading", { name: /verify your identity/i })).toBeInTheDocument();
  });

  it("renders form with correct action", () => {
    render(<LoginOtp kcContext={mockKcContext} />);
    expect(screen.getByRole("form")).toHaveAttribute("action", "https://auth.example.com/otp-action");
  });

  it("renders OTP input field", () => {
    render(<LoginOtp kcContext={mockKcContext} />);
    expect(screen.getByLabelText(/one-time code/i)).toBeInTheDocument();
  });

  it("renders Verify button", () => {
    render(<LoginOtp kcContext={mockKcContext} />);
    expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
  });
});
