import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { KcContext } from "keycloakify/login/KcContext";
import ResetPassword from "../../pages/ResetPassword";

type ResetPasswordKcContext = Extract<KcContext, { pageId: "login-reset-password.ftl" }>;

const mockKcContext = {
  pageId: "login-reset-password.ftl" as const,
  url: {
    loginAction: "https://auth.example.com/reset-action",
    loginUrl: "https://auth.example.com/login",
  },
  realm: { loginWithEmailAllowed: true, duplicationEmailsAllowed: false },
  auth: {},
  messagesPerField: { existsError: () => false, get: () => "" },
} as unknown as ResetPasswordKcContext;

describe("ResetPassword page", () => {
  it("renders the Reset Password heading", () => {
    render(<ResetPassword kcContext={mockKcContext} />);
    expect(screen.getByRole("heading", { name: /reset password/i })).toBeInTheDocument();
  });

  it("renders form with correct action", () => {
    render(<ResetPassword kcContext={mockKcContext} />);
    expect(screen.getByRole("form")).toHaveAttribute("action", "https://auth.example.com/reset-action");
  });

  it("renders email input", () => {
    render(<ResetPassword kcContext={mockKcContext} />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("renders Send Reset Link button", () => {
    render(<ResetPassword kcContext={mockKcContext} />);
    expect(screen.getByRole("button", { name: /send reset link/i })).toBeInTheDocument();
  });

  it("disables native validation popups via noValidate", () => {
    render(<ResetPassword kcContext={mockKcContext} />);
    expect(screen.getByRole("form")).toHaveAttribute("novalidate");
  });

  it("blocks submission and shows inline error when email is empty", () => {
    render(<ResetPassword kcContext={mockKcContext} />);

    const propagated = fireEvent.submit(screen.getByRole("form") as HTMLFormElement);

    expect(propagated).toBe(false);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it("blocks submission with an inline error when the email format is invalid", async () => {
    const user = userEvent.setup();
    render(<ResetPassword kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");

    const propagated = fireEvent.submit(screen.getByRole("form") as HTMLFormElement);

    expect(propagated).toBe(false);
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it("allows submission when the email is valid", async () => {
    const user = userEvent.setup();
    render(<ResetPassword kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/email address/i), "ada@example.com");

    const form = screen.getByRole("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => e.preventDefault());
    fireEvent.submit(form);

    expect(screen.queryByText(/email is required/i)).toBeNull();
    expect(screen.queryByText(/enter a valid email address/i)).toBeNull();
  });
});
