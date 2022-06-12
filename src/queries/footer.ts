import { graphql, useStaticQuery } from "gatsby";

export type FooterData = string | undefined;

export const query = graphql`
  query FooterQuery {
    footerJson {
      main {
        code
      }
    }
  }
`;

export const convert = (data: Queries.FooterQueryQuery): FooterData => {
  return data.footerJson?.main?.code ?? undefined;
};

export const useFooterData = () => convert(useStaticQuery(query));
