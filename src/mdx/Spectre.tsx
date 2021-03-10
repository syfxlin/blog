import { isSSR } from "../utils/ssr";

const ReactSpectre = isSSR ? {} : require("react-spectre.css");

export default ReactSpectre;
