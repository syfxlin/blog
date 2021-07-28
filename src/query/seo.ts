import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { SeoData } from "./types";
import { LinkProps, MetaProps, OpenGraph } from "gatsby-plugin-next-seo";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusSeo: {
    language: string;
    url: string;
    title: string;
    description?: string;
    logo: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
    opengraph?: OpenGraph;
    twitter?: string;
    meta_tags?: MetaProps[];
    link_tags?: LinkProps[];
  };
};

export const query = graphql`
  query SeoQuery {
    directusSeo {
      language
      url
      title
      description
      logo {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      opengraph
      twitter
      meta_tags
      link_tags
    }
  }
`;

export const convert = (data: QueryData): SeoData => {
  return {
    language: data.directusSeo.language,
    url: data.directusSeo.url,
    title: data.directusSeo.title,
    description: data.directusSeo.description,
    logo: data.directusSeo.logo.localFile.childImageSharp.gatsbyImageData,
    openGraph: data.directusSeo.opengraph,
    twitter: data.directusSeo.twitter,
    metaTags: data.directusSeo.meta_tags,
    linkTags: data.directusSeo.link_tags
  };
};

export const useSeoData = () => convert(useStaticQuery(query));
