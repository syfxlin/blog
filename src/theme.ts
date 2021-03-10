const light = {
  type: "light",
  primary: "#5755d9",
  text: "#3b4351",
  text2: "#b2bcc3",
  background: "#FFF",
  shadow: "rgba(0, 0, 0, 0.2)",
  divider: "rgba(0, 0, 0, 0.2)",
  codeBackground: "rgba(245, 242, 240, 1)"
};

const dark = {
  type: "dark",
  primary: "#5755d9",
  text: "#FFF",
  text2: "#b2bcc3",
  background: "#3b4351",
  shadow: "rgba(0, 0, 0, 0.2)",
  divider: "rgba(255, 255, 255, 0.2)",
  codeBackground: "#272822"
};

const theme = {
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
