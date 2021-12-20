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
  },
};

export const darkTheme: DefaultTheme = {
  width: {
    centerMaxWidth: "1100px",
  },
  color: {
    background: "#1f1b24",
    text: "#F0F0F0",
    accent: "#FF6984",
    hover: "#121212",
    accentHover: "#f5bcc7",
  },
};
