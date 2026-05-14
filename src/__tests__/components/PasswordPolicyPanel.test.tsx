import { render, screen } from "@testing-library/react";
import PasswordPolicyPanel from "../../components/PasswordPolicyPanel";

describe("PasswordPolicyPanel", () => {
  it("lists every rule in PASSWORD_RULES order", () => {
    render(<PasswordPolicyPanel password="" />);
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual([
      "At least 8-12 characters in length",
      "Must include uppercase, lowercase and number",
      "Special characters",
      "Can not be same as email or username",
    ]);
  });

  it("shows Weak for empty password and Strong for a fully compliant one", () => {
    const { rerender } = render(<PasswordPolicyPanel password="" />);
    expect(screen.getByText(/^Weak$/)).toBeInTheDocument();
    rerender(<PasswordPolicyPanel password="Abcdefg1!" />);
    expect(screen.getByText(/^Strong$/)).toBeInTheDocument();
  });

  it("flips the notIdentity rule based on the supplied identity", () => {
    const { rerender } = render(<PasswordPolicyPanel password="Abcdefg1!" identity="other" />);
    expect(screen.getByText(/^Strong$/)).toBeInTheDocument();
    rerender(<PasswordPolicyPanel password="Abcdefg1!" identity="abcdefg1!" />);
    // Identity match drops one rule → Medium (3 of 4 pass).
    expect(screen.getByText(/^Medium$/)).toBeInTheDocument();
  });
});
