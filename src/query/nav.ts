import { NavData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  navJson: {
    main: {
      title: string;
      url: string;
      sub?: {
        title: string;
        url: string;
      }[];
    }[];
  };
};

export const query = graphql`
  query NavQuery {
    navJson {
      main {
        title
        url
        sub {
          title
          url
        }
      }
    }
  }
`;

export const convert = (data: QueryData): NavData => {
  return data.navJson.main.map((nav) => ({
    title: nav.title,
    url: nav.url,
    sub: nav.sub || []
  }));
};

export const useNavData = () => convert(useStaticQuery(query));
