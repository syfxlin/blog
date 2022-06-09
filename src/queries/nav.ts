import { graphql, useStaticQuery } from "gatsby";

export enum NavViewType {
  FULL = "full",
  ELASTIC = "elastic",
  ICON = "icon",
}

export type NavData = {
  title: string;
  url: string;
  icon: string;
  view: NavViewType;
}[];

type QueryData = {
  navJson: {
    main: {
      title: string;
      url: string;
      icon: string;
      view: string;
    }[];
  };
};

export const query = graphql`
  query NavQuery {
    navJson {
      main {
        title
        url
        icon
        view
      }
    }
  }
`;

export const convert = (data: QueryData): NavData => {
  return data.navJson.main.map((i) => ({
    title: i.title,
    url: i.url,
    icon: i.icon,
    view: (i.view ?? "elastic") as NavViewType,
  }));
};

export const useNavData = () => convert(useStaticQuery(query));
