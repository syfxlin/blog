import linksJson from "./links.json";

export type Link = {
  name: string;
  url: string;
  avatar: string;
  bio?: string;
  author?: string;
};

// 友链
export const links: Link[] = linksJson.links;

// 无法访问的友链
export const lostConnection: Link[] = linksJson.lostConnection;
