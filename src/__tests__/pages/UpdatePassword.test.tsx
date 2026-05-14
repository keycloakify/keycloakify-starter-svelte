import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { KcContext } from "keycloakify/login/KcContext";
import UpdatePassword from "../../pages/UpdatePassword";

type UpdatePasswordKcContext = Extract<KcContext, { pageId: "login-update-password.ftl" }>;

const mockKcContext = {
  pageId: "login-update-password.ftl" as const,
  url: {
    loginAction: "https://auth.example.com/update-password-action",
    loginUrl: "https://auth.example.com/login",
  },
  isAppInitiatedAction: false,
  auth: { attemptedUsername: "ada@example.com" },
  messagesPerField: { existsError: () => false, get: () => "" },
} as unknown as UpdatePasswordKcContext;

describe("UpdatePassword page", () => {
  it("renders the Create New Password heading", () => {
    render(<UpdatePassword kcContext={mockKcContext} />);
    expect(screen.getByRole("heading", { name: /create new password/i })).toBeInTheDocument();
  });

  it("renders form with correct action", () => {
    render(<UpdatePassword kcContext={mockKcContext} />);
    expect(screen.getByRole("form")).toHaveAttribute("action", "https://auth.example.com/update-password-action");
  });

  it("renders new and confirm password inputs", () => {
    render(<UpdatePassword kcContext={mockKcContext} />);
    expect(screen.getByLabelText(/new password/i, { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i, { selector: "input" })).toBeInTheDocument();
  });

  it("renders Update Password button", () => {
    render(<UpdatePassword kcContext={mockKcContext} />);
    expect(screen.getByRole("button", { name: /update password/i })).toBeInTheDocument();
  });

  it("renders the inline Password Policy panel with all four rules", () => {
    render(<UpdatePassword kcContext={mockKcContext} />);
    expect(screen.getByText(/password policy:/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 8-12 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/uppercase, lowercase and number/i)).toBeInTheDocument();
    expect(screen.getByText(/special characters/i)).toBeInTheDocument();
    expect(screen.getByText(/same as email or username/i)).toBeInTheDocument();
  });

  it("policy strength label tracks the password as the user types", async () => {
    const user = userEvent.setup();
    render(<UpdatePassword kcContext={mockKcContext} />);
    expect(screen.getByText(/^Weak$/)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/new password/i, { selector: "input" }), "Abcdefg1");
    expect(screen.getByText(/^Medium$/)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/new password/i, { selector: "input" }), "!");
    expect(screen.getByText(/^Strong$/)).toBeInTheDocument();
  });

  it("blocks submission and shows inline errors when password is invalid", () => {
    render(<UpdatePassword kcContext={mockKcContext} />);
    const propagated = fireEvent.submit(screen.getByRole("form"));
    expect(propagated).toBe(false);
    expect(screen.getByText(/Minimum 8 characters required/i)).toBeInTheDocument();
  });

  it("blocks submission when password equals the attempted username", async () => {
    const user = userEvent.setup();
    // Use an identity string that already satisfies length+mixed+special so the
    // notIdentity rule is the only failing one when password === identity.
    const identityCtx = {
      ...mockKcContext,
      auth: { attemptedUsername: "Ada1@example.com" },
    } as unknown as typeof mockKcContext;
    render(<UpdatePassword kcContext={identityCtx} />);
    const newPwd = screen.getByLabelText(/new password/i, { selector: "input" });
    const confirmPwd = screen.getByLabelText(/confirm password/i, { selector: "input" });
    await user.type(newPwd, "Ada1@example.com");
    await user.type(confirmPwd, "Ada1@example.com");
    const propagated = fireEvent.submit(screen.getByRole("form"));
    expect(propagated).toBe(false);
    expect(screen.getByText(/same as your email or username/i)).toBeInTheDocument();
  });

  it("does not block submission when password satisfies every rule", async () => {
    const user = userEvent.setup();
    render(<UpdatePassword kcContext={mockKcContext} />);
    const form = screen.getByRole("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => e.preventDefault());

    await user.type(screen.getByLabelText(/new password/i, { selector: "input" }), "Abcdefg1!");
    await user.type(screen.getByLabelText(/confirm password/i, { selector: "input" }), "Abcdefg1!");
    fireEvent.submit(form);

    expect(screen.queryByText(/Minimum 8 characters required/i)).toBeNull();
    expect(screen.queryByText(/same as your email or username/i)).toBeNull();
    expect(screen.queryByText(/Passwords do not match/i)).toBeNull();
  });
});
