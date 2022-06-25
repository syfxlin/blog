import { IGatsbyImageData } from "gatsby-plugin-image";
import { convert as convertPage, PageData } from "./page";

export type FriendsPageData = PageData & {
  links: {
    name: string;
    url: string;
    avatar: IGatsbyImageData;
    bio?: string;
    author?: string;
  }[];
  lostConnection: {
    name: string;
    url: string;
  }[];
};

// prettier-ignore
export const convert = (data: Queries.FriendsPageQueryQuery): FriendsPageData => {
  return {
    links: (data.linksJson?.links ?? []).map((link: any) => ({
      name: link.name,
      url: link.url,
      author: link.author,
      bio: link.bio,
      avatar: link.avatar?.childImageSharp?.gatsbyImageData
    })),
    lostConnection: (data.linksJson?.lostConnection ?? []).map((link: any) => ({
      name: link.name,
      url: link.url
    })),
    ...convertPage(data)
  };
};
