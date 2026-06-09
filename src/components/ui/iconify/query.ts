import type { IconifyJSON } from "@iconify/types";
import carbon from "@iconify/json/json/carbon.json";
import la from "@iconify/json/json/la.json";
import lucide from "@iconify/json/json/lucide.json";
import material from "@iconify/json/json/material-symbols.json";
import ph from "@iconify/json/json/ph.json";
import ri from "@iconify/json/json/ri.json";
import simple from "@iconify/json/json/simple-icons.json";
import tabler from "@iconify/json/json/tabler.json";
import uil from "@iconify/json/json/uil.json";
import { getIconData, iconToHTML, iconToSVG } from "@iconify/utils";

const icons = [ri, ph, la, uil, carbon, tabler, lucide, simple, material] as Array<IconifyJSON>;

function svg(icon: string) {
  const [prefix, target] = icon.split(":");
  if (!prefix || !target) {
    throw new TypeError(`Invalid icon: ${icon}`);
  }
  const data = icons.find(i => i.prefix === prefix);
  if (!data) {
    throw new TypeError(`Invalid icon: ${icon}`);
  }
  const item = getIconData(data, target);
  if (!item) {
    throw new TypeError(`Invalid icon: ${icon}`);
  }
  return iconToSVG(item, { width: "1.1rem", height: "1.1rem" });
}

function css(icon: string) {
  const data = svg(icon);
  const html = iconToHTML(data.body, data.attributes);
  return `
    --icon: url(data:image/svg+xml,${encodeURIComponent(html)});
    display: inline-block;
    width: 1.1rem;
    height: 1.1rem;
    color: inherit;
    background-color: currentColor;
    -webkit-mask: var(--icon) no-repeat;
    mask: var(--icon) no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  `;
}

export const iconify = { svg, css };
