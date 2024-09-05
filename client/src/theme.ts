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
