import { AplayerData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  aplayerJson: {
    enable: boolean;
    playlist: string;
  };
};

export const query = graphql`
  query AplayerQuery {
    aplayerJson {
      enable
      playlist
    }
  }
`;

export const convert = (data: QueryData): AplayerData => {
  return data.aplayerJson;
};

export const useAplayerData = () => convert(useStaticQuery(query));
