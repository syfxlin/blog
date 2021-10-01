import { LicenseData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  licenseJson: {
    label: string;
    href: string;
  };
};

export const query = graphql`
  query LicenseQuery {
    licenseJson {
      label
      href
    }
  }
`;

export const convert = (data: QueryData): LicenseData => {
  return data.licenseJson;
};

export const useLicenseData = () => convert(useStaticQuery(query));
