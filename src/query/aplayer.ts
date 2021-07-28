import { AplayerData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusConfig: {
    value?: {
      playlist: string;
    };
  };
};

export const query = graphql`
  query AplayerQuery {
    directusConfig(key: { eq: "aplayer" }) {
      value
    }
  }
`;

export const convert = (data: QueryData): AplayerData => {
  return data.directusConfig.value;
};

export const useAplayerData = () => convert(useStaticQuery(query));
