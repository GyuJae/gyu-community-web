import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  width: {
    centerMaxWidth: "1100px",
  },
  color: {
    background: "#F0F0F0",
    text: "#2C3E50",
    accent: "#FF6984",
    hover: "#dcdcdc",
    accentHover: "#f5bcc7",
    backgroundHover: "#FFFFFF",
  },
};

export const darkTheme: DefaultTheme = {
  width: {
    centerMaxWidth: "1100px",
  },
  color: {
    background: "#212121",
    text: "#F0F0F0",
    accent: "#FF6984",
    hover: "#121212",
    accentHover: "#f5bcc7",
    backgroundHover: "#383838",
  },
};
