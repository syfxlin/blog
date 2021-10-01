import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { LinkProps, MetaProps, OpenGraph } from "gatsby-plugin-next-seo";
import { TocItem } from "../components/Toc";

export type AlgoliaData = {
  appId: string;
  appKey: string;
  indexName: string;
};

export type AuthorData = {
  firstName: string;
  lastName: string;
  description: string;
  avatar: IGatsbyImageData;
  background: IGatsbyImageData;
};

export type BackgroundData = IGatsbyImageData[] | undefined;

export type AplayerData = {
  enable: boolean;
  playlist: string;
};

export type NavData = {
  title: string;
  url: string;
  sub: {
    title: string;
    url: string;
  }[];
}[];

export type CategoriesData = {
  name: string;
  count: number;
}[];

export type TagsData = {
  name: string;
  count: number;
}[];

export type ArchivesData = {
  name: string;
  count: number;
}[];

export type ArchivePageData = {
  name: string;
  items: {
    link: string;
    title: string;
    author: string;
    date: string;
    thumbnail?: IGatsbyImageData;
    categories?: string[];
    excerpt: string;
  }[];
}[];

export type CategoryPageData = {
  link: string;
  title: string;
  author: string;
  date: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
  excerpt: string;
}[];

export type HeroData = {
  title: string;
  subtitle: string;
  link: {
    label?: string;
    href?: string;
  };
  background: IGatsbyImageData[];
};

export type ListPageData = {
  link: string;
  title: string;
  author: string;
  date: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
  excerpt: string;
}[];

export type SeoData = {
  language: string;
  url: string;
  title: string;
  description?: string;
  logo: IGatsbyImageData;
  openGraph?: OpenGraph;
  twitter?: string;
  metaTags?: MetaProps[];
  linkTags?: LinkProps[];
};

export type TagPageData = {
  link: string;
  title: string;
  author: string;
  date: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
  excerpt: string;
}[];

export type PageData = {
  link: string;
  title: string;
  author: string;
  dateCreated: string;
  dateUpdated?: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
  excerpt: string;
  toc?: { items: TocItem[] };
  body: string;
};

export type ArtalkData =
  | {
      serverUrl: string;
    }
  | undefined;

export type LicenseData =
  | {
      label: string;
      href: string;
    }
  | undefined;

export type FooterData = string | undefined;

export type FriendsData = PageData & {
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
