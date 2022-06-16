import { graphql } from "gatsby";
import React from "react";
import { convert } from "../queries/articles";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { join } from "../utils/urls";

export type ListPageProps = {
  data: Queries.ArticlesPageQueryQuery;
  pageContext: {
    current: number;
    size: number;
  };
};

const ListPage: React.FC<ListPageProps> = (props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;

  return (
    <>
      <Header />
      <Main>
        <Hero />
        <section>
          {data.map((item) => (
            <Card
              key={`list-item-${item.link}`}
              title={item.title}
              link={item.link}
              date={item.date}
              excerpt={item.excerpt}
              thumbnail={item.thumbnail}
              categories={item.categories}
              tags={item.tags}
            />
          ))}
        </section>
        <Pagination
          current={ctx.current}
          size={ctx.size}
          onLink={(page) => join("page", page)}
        />
      </Main>
    </>
  );
};

export default ListPage;

export const query = graphql`
  query ArticlesPageQuery($skip: Int!, $limit: Int!, $status: [String!]!) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          date_updated(formatString: "YYYY-MM-DD")
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          categories
          tags
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;
