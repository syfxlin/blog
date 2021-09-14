export const status =
  process.env.NODE_ENV === "development"
    ? ["published", "draft", "archived"]
    : ["published"];
