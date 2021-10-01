import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    type: "light" | "dark";
    primary: string;
    text: string;
    text2: string;
    background: string;
    shadow: string;
    divider: string;
    codeBackground: string;
    reverse: DefaultTheme;
    light: DefaultTheme;
    dark: DefaultTheme;
  }
}

// @ts-ignore
const light: DefaultTheme = {
  type: "light",
  primary: "#5755d9",
  text: "#3b4351",
  text2: "#b2bcc3",
  background: "#ffffff",
  shadow: "rgba(0, 0, 0, 0.2)",
  divider: "rgba(0, 0, 0, 0.2)",
  codeBackground: "rgba(245, 242, 240, 1)"
};

// @ts-ignore
const dark: DefaultTheme = {
  type: "dark",
  primary: "#5755d9",
  text: "#ffffff",
  text2: "#b2bcc3",
  background: "#3b4351",
  shadow: "rgba(0, 0, 0, 0.2)",
  divider: "rgba(255, 255, 255, 0.2)",
  codeBackground: "#272822"
};

const theme: {
  light: DefaultTheme;
  dark: DefaultTheme;
} = {
  light: {
    ...light,
    reverse: dark,
    light,
    dark
  },
  dark: {
    ...dark,
    reverse: light,
    light,
    dark
  }
};

export default theme;
