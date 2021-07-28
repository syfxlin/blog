import { FooterData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusFooter: {
    footer?: string;
  };
};

export const query = graphql`
  query FooterQuery {
    directusFooter {
      footer
    }
  }
`;

export const convert = (data: QueryData): FooterData => {
  return data.directusFooter.footer;
};

export const useFooterData = () => convert(useStaticQuery(query));
