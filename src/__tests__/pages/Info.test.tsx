import { render, screen } from "@testing-library/react";
import type { KcContext } from "keycloakify/login/KcContext";
import Info from "../../pages/Info";

type InfoKcContext = Extract<KcContext, { pageId: "info.ftl" }>;

function makeContext(overrides: Partial<Record<string, unknown>>): InfoKcContext {
  return {
    pageId: "info.ftl" as const,
    url: {
      loginUrl: "https://auth.example.com/login",
      loginRestartFlowUrl: "https://auth.example.com/restart",
    },
    messageHeader: undefined,
    message: { summary: "Default message" },
    requiredActions: undefined,
    actionUri: undefined,
    ...overrides,
  } as unknown as InfoKcContext;
}

describe("Info page", () => {
  it("renders the Email Verified success state when message.type is success", () => {
    render(<Info kcContext={makeContext({ message: { type: "success", summary: "Password updated" } })} />);
    expect(screen.getByRole("heading", { name: /email verified/i })).toBeInTheDocument();
    expect(screen.getByText(/you.+re verified!/i)).toBeInTheDocument();
  });

  it("renders the Verify Your Email screen when summary mentions email", () => {
    render(<Info kcContext={makeContext({ message: { type: "info", summary: "You should receive an email shortly." } })} />);
    expect(screen.getByRole("heading", { name: /verify your email/i })).toBeInTheDocument();
    expect(screen.getByText(/sent a verification link/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /resend link/i })).toBeInTheDocument();
  });

  it("renders Continue CTA on the success state pointing to loginUrl", () => {
    render(
      <Info
        kcContext={makeContext({
          message: { type: "success", summary: "Done" },
          actionUri: "https://auth.example.com/should-be-ignored",
        })}
      />,
    );
    const cta = screen.getByRole("link", { name: /continue/i });
    expect(cta).toBeInTheDocument();
    // Per spec, Continue returns to Login — actionUri must NOT be used here.
    expect(cta).toHaveAttribute("href", "https://auth.example.com/login");
  });

  it("renders Continue CTA on the generic non-success state", () => {
    render(<Info kcContext={makeContext({ message: { type: "warning", summary: "Heads up." } })} />);
    expect(screen.getByRole("link", { name: /continue/i })).toBeInTheDocument();
  });
});
