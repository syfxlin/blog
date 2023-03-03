export const status =
  process.env.NODE_ENV === "development"
    ? ["publish", "draft", "archive"]
    : ["publish"];
