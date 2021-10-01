import { AlgoliaData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  algoliaJson: {
    appId: string;
    appKey: string;
    indexName: string;
  };
};

export const query = graphql`
  query AlgoliaQuery {
    algoliaJson {
      appId
      appKey
      indexName
    }
  }
`;

export const convert = (data: QueryData): AlgoliaData => {
  return data.algoliaJson;
};

export const useAlgoliaData = () => convert(useStaticQuery(query));
