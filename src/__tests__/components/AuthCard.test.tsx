import { render, screen } from "@testing-library/react";
import AuthCard from "../../components/AuthCard";

describe("AuthCard", () => {
  it("renders children inside the card", () => {
    render(<AuthCard><p>hello</p></AuthCard>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies card styles via className", () => {
    const { container } = render(<AuthCard><span /></AuthCard>);
    expect(container.firstChild).toHaveClass("auth-card");
  });
});
