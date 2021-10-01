import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { SeoData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

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
    opengraph?: {
      code: string;
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
      opengraph {
        code
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
    openGraph: JSON.parse(data.seoJson.opengraph?.code || "{}"),
    twitter: data.seoJson.twitter,
    metaTags: JSON.parse(data.seoJson.meta_tags?.code || "[]"),
    linkTags: JSON.parse(data.seoJson.link_tags?.code || "[]")
  };
};

export const useSeoData = () => convert(useStaticQuery(query));
