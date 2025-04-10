/**
 * Button variant mappings to Material-UI variants
 */
export const buttonVariants = {
  contained: "contained",
  outlined: "outlined",
  text: "text",
  link: "text", // Custom variant that will be styled differently
};

/**
 * Button size mappings to Material-UI sizes
 */
export const buttonSizes = {
  small: "small",
  medium: "medium",
  large: "large",
};

/**
 * Custom styles for the link variant
 */
export const linkStyles = {
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};
