import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { KcContext } from "keycloakify/login/KcContext";
import Register from "../../pages/Register";

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

const mockKcContext = {
  pageId: "register.ftl" as const,
  url: {
    registrationAction: "https://auth.example.com/register-action",
    loginUrl: "https://auth.example.com/login",
  },
  realm: { registrationEmailAsUsername: false },
  passwordRequired: true,
  recaptchaRequired: false,
  profile: { attributesByName: {} },
  messagesPerField: { existsError: () => false, get: () => "" },
} as unknown as RegisterKcContext;

describe("Register page", () => {
  it("renders the hero and Sign Up headings", () => {
    render(<Register kcContext={mockKcContext} />);
    expect(screen.getByRole("heading", { name: /start building your store/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^sign up$/i })).toBeInTheDocument();
  });

  it("renders form with correct action", () => {
    render(<Register kcContext={mockKcContext} />);
    expect(screen.getByRole("form")).toHaveAttribute("action", "https://auth.example.com/register-action");
  });

  it("renders first name, last name, email and password fields", () => {
    render(<Register kcContext={mockKcContext} />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i, { selector: "input" })).toBeInTheDocument();
  });

  it("renders the Terms & Privacy link", () => {
    render(<Register kcContext={mockKcContext} />);
    expect(screen.getByRole("link", { name: /terms & privacy policy/i })).toBeInTheDocument();
  });

  it("renders the Sign In panel CTA", () => {
    render(<Register kcContext={mockKcContext} />);
    const signIn = screen.getByRole("link", { name: /^sign in$/i });
    expect(signIn).toHaveAttribute("href", "https://auth.example.com/login");
  });

  it("blocks submission and shows per-field errors when fields are empty", () => {
    render(<Register kcContext={mockKcContext} />);
    const form = screen.getByRole("form") as HTMLFormElement;

    const propagated = fireEvent.submit(form);

    expect(propagated).toBe(false);
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/minimum 8 characters required/i)).toBeInTheDocument();
  });

  it("blocks submission when the password fails a non-length rule", async () => {
    const user = userEvent.setup();
    render(<Register kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/first name/i), "Ada");
    await user.type(screen.getByLabelText(/last name/i), "Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^password$/i, { selector: "input" }), "abcdefgh");

    const propagated = fireEvent.submit(screen.getByRole("form") as HTMLFormElement);
    expect(propagated).toBe(false);
    expect(screen.getByText(/uppercase, lowercase and a number/i)).toBeInTheDocument();
  });

  it("blocks submission when the password equals the email (notIdentity rule)", async () => {
    const user = userEvent.setup();
    render(<Register kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/first name/i), "Ada");
    await user.type(screen.getByLabelText(/last name/i), "Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "Ada1@example.com");
    await user.type(screen.getByLabelText(/^password$/i, { selector: "input" }), "Ada1@example.com");

    const propagated = fireEvent.submit(screen.getByRole("form") as HTMLFormElement);
    expect(propagated).toBe(false);
    expect(screen.getByText(/same as your email or username/i)).toBeInTheDocument();
  });

  it("blocks submission when email format is invalid", async () => {
    const user = userEvent.setup();
    render(<Register kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/first name/i), "Ada");
    await user.type(screen.getByLabelText(/last name/i), "Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.type(screen.getByLabelText(/^password$/i, { selector: "input" }), "Abcdefg1!");

    const form = screen.getByRole("form") as HTMLFormElement;
    const propagated = fireEvent.submit(form);

    expect(propagated).toBe(false);
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it("allows submission when all client-side validations pass", async () => {
    const user = userEvent.setup();
    render(<Register kcContext={mockKcContext} />);

    await user.type(screen.getByLabelText(/first name/i), "Ada");
    await user.type(screen.getByLabelText(/last name/i), "Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^password$/i, { selector: "input" }), "Abcdefg1!");

    const form = screen.getByRole("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => e.preventDefault());
    fireEvent.submit(form);

    expect(screen.queryByText(/first name is required/i)).toBeNull();
    expect(screen.queryByText(/last name is required/i)).toBeNull();
    expect(screen.queryByText(/email is required/i)).toBeNull();
    expect(screen.queryByText(/enter a valid email address/i)).toBeNull();
    expect(screen.queryByText(/minimum 8 characters required/i)).toBeNull();
  });
});
