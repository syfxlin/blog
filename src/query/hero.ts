import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { HeroData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusHero: {
    title: string;
    subtitle: string;
    link_label?: string;
    link_href?: string;
    background: {
      directus_files_id: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    }[];
  };
};

export const query = graphql`
  query HeroQuery {
    directusHero {
      title
      subtitle
      link_label
      link_href
      background {
        directus_files_id {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;

export const convert = (data: QueryData): HeroData => {
  return {
    title: data.directusHero.title,
    subtitle: data.directusHero.subtitle,
    link: {
      label: data.directusHero.link_label,
      href: data.directusHero.link_href
    },
    background: data.directusHero.background.map(
      (b) => b.directus_files_id.localFile.childImageSharp.gatsbyImageData
    )
  };
};

export const useHeroData = () => convert(useStaticQuery(query));
