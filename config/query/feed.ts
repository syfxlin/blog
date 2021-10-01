import { status } from "./filter";

export const description = `
  query FeedDescriptionQuery {
    seoJson {
      title
      description
      site_url: url
      siteUrl: url
    }
  }
`;

type QueryData = {
  allMdx: {
    nodes: {
      frontmatter: {
        title: string;
        date: string;
      };
      fields: {
        slug: string;
      };
      excerpt: string;
    }[];
  };
  seoJson: {
    url: string;
  };
};

export type FeedData = {
  title: string;
  date: string;
  description: string;
  url: string;
  guid: string;
}[];

export const query = `
  query FeedQuery {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: ${JSON.stringify(
          status
        )} }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields {
          slug
        }
        excerpt
      }
    }
    seoJson {
      url
    }
  }
`;

export const convert = (data: QueryData): FeedData => {
  return data.allMdx.nodes.map((node) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    description: node.excerpt,
    guid: data.seoJson.url + node.fields.slug,
    url: data.seoJson.url + node.fields.slug
  }));
};
