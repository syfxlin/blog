import { NavData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  allDirectusNav: {
    nodes: {
      title: string;
      url: string;
      sub?: {
        related_nav_id: {
          title: string;
          url: string;
        };
      }[];
    }[];
  };
};

export const query = graphql`
  query NavQuery {
    allDirectusNav(filter: { active: { eq: true } }, sort: { fields: sort }) {
      nodes {
        title
        url
        sub {
          related_nav_id {
            title
            url
          }
        }
      }
    }
  }
`;

export const convert = (data: QueryData): NavData => {
  return data.allDirectusNav.nodes.map((nav) => ({
    title: nav.title,
    url: nav.url,
    sub: (nav.sub || []).map((n) => n.related_nav_id)
  }));
};

export const useNavData = () => convert(useStaticQuery(query));
