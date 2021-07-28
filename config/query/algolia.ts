import { status } from "./filter";

export type AlgoliaIndexData = {
  objectID: string;
  link: string;
  title: string;
  author: string;
  date: string;
  categories?: string[];
  tags?: string[];
  excerpt: string;
  content: string;
}[];

type QueryData = {
  allDirectusArticle: {
    nodes: {
      id: string;
      link: string;
      title: string;
      user_created: {
        first_name: string;
        last_name: string;
      };
      date_created: string;
      categories: {
        category_id: {
          name: string;
        };
      }[];
      tags: {
        tag_id: {
          name: string;
        };
      }[];
      markdownNode: {
        childMdx: {
          excerpt: string;
        };
      };
      content: string;
    }[];
  };
};

export const query = `
  query AlgoliaIndexQuery {
    allDirectusArticle(filter: { status: {in: ${JSON.stringify(status)}} }) {
      nodes {
        id
        link
        title
        user_created {
          first_name
          last_name
        }
        date_created
        categories {
          category_id {
            name
          }
        }
        tags {
          tag_id {
            name
          }
        }
        markdownNode {
          childMdx {
            excerpt
          }
        }
        content
      }
    }
  }
`;

export const convert = (data: QueryData): AlgoliaIndexData => {
  return data.allDirectusArticle.nodes.map((node) => ({
    objectID: node.id,
    link: node.link,
    title: node.title,
    author: `${node.user_created.first_name} ${node.user_created.last_name}`,
    date: node.date_created.substring(0, 10),
    categories: node.categories.map((category) => category.category_id.name),
    tags: node.tags.map((tag) => tag.tag_id.name),
    excerpt: node.markdownNode.childMdx.excerpt,
    content: node.content
  }));
};
