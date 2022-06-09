module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-hooks", "jsx-a11y", "@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "react/prop-types": "off",
    "react/display-name": "warn",
    "react/no-unknown-property": "warn",
    "react/jsx-curly-brace-presence": "error",
  },
};
