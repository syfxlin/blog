import { LicenseData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusConfig: {
    value?: {
      label: string;
      href: string;
    };
  };
};

export const query = graphql`
  query LicenseQuery {
    directusConfig(key: { eq: "license" }) {
      value
    }
  }
`;

export const convert = (data: QueryData): LicenseData => {
  return data.directusConfig.value;
};

export const useLicenseData = () => convert(useStaticQuery(query));
