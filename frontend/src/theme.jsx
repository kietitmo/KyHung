import { createTheme } from "@mui/material/styles";

const mechanicalTheme = createTheme({
  palette: {
    primary: {
      main: "#4a4a4a",
      light: "#6e6e6e",
      dark: "#2a2a2a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#b87333",
      light: "#d48a3d",
      dark: "#8c5a29",
      contrastText: "#fff",
    },
    background: {
      default: "#f0f0f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    metallic: {
      steel: "#4a4a4a",
      silver: "#c0c0c0",
      bronze: "#b87333",
      gold: "#ffd700",
      copper: "#b87333",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    h2: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    h3: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    h4: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    h5: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    h6: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
        },
        contained: {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontWeight: "bold",
        },
        colorPrimary: {
          backgroundColor: "#6e6e6e",
          color: "#fff",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#c0c0c0",
          borderWidth: "1px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
            "& fieldset": {
              borderColor: "#c0c0c0",
            },
            "&:hover fieldset": {
              borderColor: "#4a4a4a",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4a4a4a",
            },
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            borderRadius: "4px",
            margin: "0 4px",
          },
          "& .Mui-selected": {
            backgroundColor: "#4a4a4a",
            color: "white",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

export default mechanicalTheme;
