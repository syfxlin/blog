import { graphql, useStaticQuery } from "gatsby";
import { LinkProps, MetaProps } from "gatsby-plugin-next-seo";
import { IGatsbyImageData } from "gatsby-plugin-image";

export type SeoData = {
  language: string;
  url: string;
  title: string;
  description?: string;
  logo: IGatsbyImageData;
  twitter?: string;
  metaTags?: MetaProps[];
  linkTags?: LinkProps[];
};

type QueryData = {
  seoJson: {
    language: string;
    url: string;
    title: string;
    description?: string;
    logo: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    twitter?: string;
    meta_tags?: {
      code: string;
    };
    link_tags?: {
      code: string;
    };
  };
};

export const query = graphql`
  query SeoQuery {
    seoJson {
      language
      url
      title
      description
      logo {
        childImageSharp {
          gatsbyImageData
        }
      }
      twitter
      meta_tags {
        code
      }
      link_tags {
        code
      }
    }
  }
`;

export const convert = (data: QueryData): SeoData => {
  return {
    language: data.seoJson.language,
    url: data.seoJson.url,
    title: data.seoJson.title,
    description: data.seoJson.description,
    logo: data.seoJson.logo.childImageSharp.gatsbyImageData,
    twitter: data.seoJson.twitter,
    metaTags: JSON.parse(data.seoJson.meta_tags?.code || "[]"),
    linkTags: JSON.parse(data.seoJson.link_tags?.code || "[]"),
  };
};

export const useSeoData = () => convert(useStaticQuery(query));
