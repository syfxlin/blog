import { graphql, useStaticQuery } from "gatsby";

export type LicenseData =
  | {
      label: string;
      href: string;
    }
  | undefined;

export const query = graphql`
  query LicenseQuery {
    licenseJson {
      label
      href
    }
  }
`;

export const convert = (data: any): LicenseData => {
  return data.licenseJson as LicenseData;
};

export const useLicenseData = () => convert(useStaticQuery(query));
