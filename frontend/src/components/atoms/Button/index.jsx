import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";
import { buttonVariants, buttonSizes } from "./styles";

/**
 * A customizable button component that extends Material-UI Button
 */
const Button = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  type = "button",
  className,
  ...props
}) => {
  return (
    <MuiButton
      variant={buttonVariants[variant] || variant}
      color={color}
      size={buttonSizes[size] || size}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Button variant */
  variant: PropTypes.oneOf(["contained", "outlined", "text", "link"]),
  /** Button color */
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  /** Button size */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Whether the button should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Icon to display at the start of the button */
  startIcon: PropTypes.node,
  /** Icon to display at the end of the button */
  endIcon: PropTypes.node,
  /** Click handler */
  onClick: PropTypes.func,
  /** Button type */
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  /** Additional CSS class name */
  className: PropTypes.string,
};

export default Button;
