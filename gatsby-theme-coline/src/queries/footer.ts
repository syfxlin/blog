import { graphql, useStaticQuery } from "gatsby";

export type FooterData = string;

export const query = graphql`
  query FooterQuery {
    footerJson {
      main {
        code
      }
    }
  }
`;

export const convert = (data: any): FooterData => {
  return data.footerJson?.main?.code ?? "";
};

export const useFooterData = () => convert(useStaticQuery(query));
