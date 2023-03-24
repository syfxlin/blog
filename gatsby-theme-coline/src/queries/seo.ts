import { graphql, useStaticQuery } from "gatsby";
import { LinkProps, MetaProps } from "gatsby-plugin-next-seo";
import { IGatsbyImageData } from "gatsby-plugin-image";

export type SeoData = {
  language: string | undefined;
  url: string | undefined;
  title: string | undefined;
  description: string | undefined;
  logo: IGatsbyImageData | undefined;
  twitter: string | undefined;
  metaTags: MetaProps[] | undefined;
  linkTags: LinkProps[] | undefined;
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

export const convert = (data: any): SeoData => {
  return {
    language: data.seoJson?.language ?? undefined,
    url: data.seoJson?.url ?? undefined,
    title: data.seoJson?.title ?? undefined,
    description: data.seoJson?.description ?? undefined,
    logo: data.seoJson?.logo?.childImageSharp?.gatsbyImageData ?? undefined,
    twitter: data.seoJson?.twitter ?? undefined,
    metaTags: JSON.parse(data.seoJson?.meta_tags?.code || "[]"),
    linkTags: JSON.parse(data.seoJson?.link_tags?.code || "[]"),
  };
};

export const useSeoData = () => convert(useStaticQuery(query));
