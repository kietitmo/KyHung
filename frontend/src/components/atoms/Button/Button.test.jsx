import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("MuiButton-contained");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByRole("button")).toHaveClass("MuiButton-outlined");

    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("MuiButton-text");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("MuiButton-sizeSmall");

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("MuiButton-sizeLarge");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with icons", () => {
    render(
      <Button
        startIcon={<span data-testid="start-icon">★</span>}
        endIcon={<span data-testid="end-icon">★</span>}
      >
        With Icons
      </Button>
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("can be full width", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("MuiButton-fullWidth");
  });
});
