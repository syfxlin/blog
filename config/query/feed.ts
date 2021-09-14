import { status } from "./filter";

export const description = `
  query FeedDescriptionQuery {
    directusSeo {
      title
      description
      site_url: url
      siteUrl: url
    }
  }
`;

type QueryData = {
  allDirectusArticle: {
    nodes: {
      link: string;
      title: string;
      date_created: string;
      markdownNode: {
        childMdx: {
          excerpt: string;
        };
      };
    }[];
  };
  directusSeo: {
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
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: {in: ${JSON.stringify(
        status
      )}} }
      sort: { order: DESC, fields: date_created }
    ) {
      nodes {
        link
        title
        date_created
        markdownNode {
          childMdx {
            excerpt
          }
        }
      }
    }
    directusSeo {
      url
    }
  }
`;

export const convert = (data: QueryData): FeedData => {
  return data.allDirectusArticle.nodes.map((node) => ({
    title: node.title,
    date: node.date_created.substring(0, 10),
    description: node.markdownNode.childMdx.excerpt,
    guid: data.directusSeo.url + node.link,
    url: data.directusSeo.url + node.link
  }));
};
