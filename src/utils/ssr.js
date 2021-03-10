const React = require("react");

const isSSR = typeof window === "undefined";

const CheckSSR = React.createContext(false);

const useSSR = () => React.useContext(CheckSSR);

const InsideSSR = ({ children }) => (
  <CheckSSR.Consumer>{(isSsr) => isSsr && children}</CheckSSR.Consumer>
);
const OutsideSSR = ({ children }) => (
  <CheckSSR.Consumer>{(isSsr) => !isSsr && children}</CheckSSR.Consumer>
);

module.exports = {
  isSSR,
  CheckSSR,
  useSSR,
  InsideSSR,
  OutsideSSR
};
