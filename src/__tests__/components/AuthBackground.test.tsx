import { render, screen } from "@testing-library/react";
import AuthBackground from "../../components/AuthBackground";

describe("AuthBackground", () => {
  it("renders children", () => {
    render(<AuthBackground><p>content</p></AuthBackground>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
