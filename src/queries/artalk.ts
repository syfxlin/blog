import { graphql, useStaticQuery } from "gatsby";

type ArtalkData =
  | {
      server: string;
      site: string;
    }
  | undefined;

export const query = graphql`
  query ArtalkQuery {
    artalkJson {
      server
      site
    }
  }
`;

export const convert = (data: Queries.ArtalkQueryQuery): ArtalkData => {
  return data.artalkJson as ArtalkData;
};

export const useArtalkData = () => convert(useStaticQuery(query));
