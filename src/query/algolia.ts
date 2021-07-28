import { AlgoliaData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusConfig: {
    value: {
      appId: string;
      appKey: string;
      indexName: string;
    };
  };
};

export const query = graphql`
  query AlgoliaQuery {
    directusConfig(key: { eq: "algolia" }) {
      value
    }
  }
`;

export const convert = (data: QueryData): AlgoliaData => {
  return data.directusConfig.value;
};

export const useAlgoliaData = () => convert(useStaticQuery(query));
