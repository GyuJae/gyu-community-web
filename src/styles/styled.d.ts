import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    width: {
      centerMaxWidth: string;
    };
    color: {
      background: string;
      text: string;
      accent: string;
      hover: string;
      accentHover: string;
      backgroundHover: string;
    };
  }
}
