import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Lexend Deca, sans-serif",
    body: "Lexend Deca, sans-serif",
  },
  colors: {
    text: {
      default: "#030303",
    },
    background: {
      50: "#121E31",
    },
    yellow: {
      50: "#f9f3e0",
      100: "#f3e7c2",
      200: "#eedd9f",
      300: "#e8d27c",
      400: "#e2c85a",
      500: "#d9b84d", // Cor base
      600: "#b39b3f",
      700: "#8d7b31",
      800: "#665a24",
      900: "#403a16",
    },
    green: {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50", // Cor base
      600: "#43a047",
      700: "#388e3c",
      800: "#2c6e2f",
      900: "#1b5e20",
    },
    blue: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3", // Cor base
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },    
    gray: {
      50: "#f9f9f9",    // Quase branco
      100: "#e6e6e6",   // Cinza claro
      200: "#cccccc",   // Cinza neutro claro
      300: "#b3b3b3",   // Cinza médio-claro
      400: "#999999",   // Cinza médio
      500: "#808080",   // Cor base (cinza padrão)
      600: "#666666",   // Cinza escuro
      700: "#4d4d4d",   // Cinza muito escuro
      800: "#333333",   // Quase preto
      900: "#1a1a1a",   // Preto profundo
    },
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280pxs
    "2xl": "96em", // 1536px
    "3xl": "120em", // 1920px
  },
});

export default theme;
