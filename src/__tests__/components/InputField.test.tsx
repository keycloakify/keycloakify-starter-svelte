import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../../components/InputField";

describe("InputField", () => {
  it("renders label and input", () => {
    render(<InputField id="email" label="Email Address" type="email" name="email" />);
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it("shows eye-toggle button for password type", () => {
    render(<InputField id="pw" label="Password" type="password" name="password" />);
    expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument();
  });

  it("toggles password visibility on eye button click", async () => {
    const user = userEvent.setup();
    render(<InputField id="pw" label="Password" type="password" name="password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(input).toHaveAttribute("type", "text");
  });

  it("does not show eye-toggle for non-password type", () => {
    render(<InputField id="email" label="Email" type="email" name="email" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("displays error message when error prop provided", () => {
    render(<InputField id="email" label="Email" type="email" name="email" error="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});
