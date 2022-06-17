import { graphql } from "gatsby";
import React from "react";
import { convert } from "../queries/archives";
import { Header } from "../layouts/Header";
import { layout, LayoutType } from "../utils/urls";
import { Main } from "../layouts/Main";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { Footer } from "../layouts/Footer";
import { Meta } from "../components/Meta";

export type ArchivesPageProps = {
  data: Queries.ArchivesPageQueryQuery;
  pageContext: {
    archive: number;
    current: number;
    size: number;
    total: number;
  };
};

const ArchivesPage: React.FC<ArchivesPageProps> = (props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;

  return (
    <>
      {/*prettier-ignore*/}
      <Header
        title={ctx.current === 1
          ? `归档：${ctx.archive} | {title}`
          : `归档：${ctx.archive} - 第 ${ctx.current} 页 | {title}`
        }
        url={ctx.current === 1
          ? `{url}${layout(LayoutType.ARCHIVE, ctx.archive)}`
          : `{url}${layout(LayoutType.ARCHIVE, ctx.archive, "page", ctx.current)}`
        }
      />
      <Main>
        {/*prettier-ignore*/}
        <Meta
          name={ctx.current === 1
            ? `归档：${ctx.archive}`
            : `归档：${ctx.archive} - 第 ${ctx.current} 页`
          }
          description={`共 ${ctx.total} 篇文章`}
        />
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
          onLink={(page) => {
            return layout(LayoutType.ARCHIVE, ctx.archive, "page", page);
          }}
        />
      </Main>
      <Footer />
    </>
  );
};

export default ArchivesPage;

export const query = graphql`
  query ArchivesPageQuery(
    $archive: Int
    $skip: Int!
    $limit: Int!
    $status: [String!]!
  ) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        fields: { date_year: { eq: $archive } }
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
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
