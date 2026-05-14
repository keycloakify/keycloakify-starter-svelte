import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { KcContext } from "keycloakify/login/KcContext";
import Login from "../../pages/Login";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

const mockKcContext = {
  pageId: "login.ftl" as const,
  url: {
    loginAction: "https://auth.example.com/login-action",
    loginUrl: "https://auth.example.com/login",
    loginResetCredentialsUrl: "https://auth.example.com/reset",
    registrationUrl: "https://auth.example.com/register",
  },
  realm: {
    registrationAllowed: true,
    resetPasswordAllowed: true,
    loginWithEmailAllowed: true,
  },
  login: { username: "" },
  auth: {},
  usernameHidden: false,
  registrationDisabled: false,
  messagesPerField: { existsError: () => false, get: () => "" },
} as unknown as LoginKcContext;

describe("Login page", () => {
  it("renders the hero and Sign In headings", () => {
    render(<Login kcContext={mockKcContext} />);
    expect(screen.getByRole("heading", { name: /log in to manage your store/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^sign in$/i })).toBeInTheDocument();
  });

  it("renders form with correct action", () => {
    render(<Login kcContext={mockKcContext} />);
    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("action", "https://auth.example.com/login-action");
  });

  it("renders email and password inputs", () => {
    render(<Login kcContext={mockKcContext} />);
    expect(screen.getByLabelText(/email address/i, { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i, { selector: "input" })).toBeInTheDocument();
  });

  it("renders Forget Password link when reset is allowed", () => {
    render(<Login kcContext={mockKcContext} />);
    expect(screen.getByText(/forget password\?/i)).toBeInTheDocument();
  });

  it("renders the Sign Up panel CTA when registration is allowed", () => {
    render(<Login kcContext={mockKcContext} />);
    const signUp = screen.getByRole("link", { name: /^sign up$/i });
    expect(signUp).toHaveAttribute("href", "https://auth.example.com/register");
  });

  it("renders the Verify Email screen when Keycloak redirects back to login.ftl with the email-sent info message", () => {
    const postResetContext = {
      ...mockKcContext,
      message: {
        type: "info",
        summary: "You should receive an email shortly with further instructions.",
      },
    } as unknown as LoginKcContext;
    render(<Login kcContext={postResetContext} />);
    expect(screen.getByRole("heading", { name: /verify your email/i })).toBeInTheDocument();
    expect(screen.getByText(/sent a verification link/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^sign in$/i })).not.toBeInTheDocument();
  });

  it("does not render the Verify Email screen for unrelated info messages (e.g. logout success)", () => {
    const logoutContext = {
      ...mockKcContext,
      message: { type: "success", summary: "You have been logged out." },
    } as unknown as LoginKcContext;
    render(<Login kcContext={logoutContext} />);
    expect(screen.getByRole("heading", { name: /^sign in$/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /verify your email/i })).not.toBeInTheDocument();
  });

  it("disables native validation popups via noValidate", () => {
    render(<Login kcContext={mockKcContext} />);
    expect(screen.getByRole("form")).toHaveAttribute("novalidate");
  });

  it("blocks submission and shows inline errors when both fields are empty", () => {
    render(<Login kcContext={mockKcContext} />);
    const form = screen.getByRole("form") as HTMLFormElement;

    const propagated = fireEvent.submit(form);

    expect(propagated).toBe(false);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("blocks submission with an inline error when the email format is invalid", async () => {
    const user = userEvent.setup();
    render(<Login kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/email address/i, { selector: "input" }), "not-an-email");
    await user.type(screen.getByLabelText(/password/i, { selector: "input" }), "anything");

    const propagated = fireEvent.submit(screen.getByRole("form") as HTMLFormElement);

    expect(propagated).toBe(false);
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it("does not show inline errors before the user attempts to submit", () => {
    render(<Login kcContext={mockKcContext} />);
    expect(screen.queryByText(/email is required/i)).toBeNull();
    expect(screen.queryByText(/password is required/i)).toBeNull();
  });

  it("allows submission when both fields are valid", async () => {
    const user = userEvent.setup();
    render(<Login kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/email address/i, { selector: "input" }), "ada@example.com");
    await user.type(screen.getByLabelText(/password/i, { selector: "input" }), "anything");

    const form = screen.getByRole("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => e.preventDefault());
    fireEvent.submit(form);

    expect(screen.queryByText(/email is required/i)).toBeNull();
    expect(screen.queryByText(/enter a valid email address/i)).toBeNull();
    expect(screen.queryByText(/password is required/i)).toBeNull();
  });
});
