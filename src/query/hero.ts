import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { HeroData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  heroJson: {
    title: string;
    subtitle: string;
    link_label?: string;
    link_href?: string;
    background: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    }[];
  };
};

export const query = graphql`
  query HeroQuery {
    heroJson {
      title
      subtitle
      link_label
      link_href
      background {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export const convert = (data: QueryData): HeroData => {
  return {
    title: data.heroJson.title,
    subtitle: data.heroJson.subtitle,
    link: {
      label: data.heroJson.link_label,
      href: data.heroJson.link_href
    },
    background: data.heroJson.background.map(
      (b) => b.childImageSharp.gatsbyImageData
    )
  };
};

export const useHeroData = () => convert(useStaticQuery(query));
