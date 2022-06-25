import { graphql } from "gatsby";
import React from "react";
import { convert } from "../queries/article";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { join } from "../utils/urls";
import { Footer } from "../layouts/Footer";

export type ArticlePageProps = {
  data: Queries.ArticlePageQueryQuery;
  pageContext: {
    current: number;
    size: number;
  };
};

const ArticlePage: React.FC<ArticlePageProps> = (props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;

  return (
    <>
      {/*prettier-ignore*/}
      <Header
        title={ctx.current === 1
          ? "{title}"
          : `文章列表：第 ${ctx.current} 页 | {title}`
        }
        url={ctx.current === 1
          ? "{url}"
          : `{url}${join("page", ctx.current)}`
        }
      />
      <Main>
        <Hero />
        <section>
          {data.map((item) => (
            <Card
              key={`article-${item.link}`}
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
      <Footer />
    </>
  );
};

export default ArticlePage;

export const query = graphql`
  query ArticlePageQuery($skip: Int!, $limit: Int!, $status: [String!]!) {
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
