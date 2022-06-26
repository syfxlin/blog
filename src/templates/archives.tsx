import React from "react";
import { graphql } from "gatsby";
import { convert } from "../queries/archives";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { Footer } from "../layouts/Footer";
import { Meta } from "../components/Meta";
import { Link } from "../components/Link";
import { layout, LayoutType } from "../utils/urls";
import { useU } from "@syfxlin/ustyled";
import { Layout } from "../layouts/Layout";
import { css } from "@emotion/react";

export type ArchivesPageProps = {
  data: Queries.ArchivesPageQueryQuery;
  pageContext: {};
};

const ArchivesPage: React.FC<ArchivesPageProps> = (props) => {
  const { u } = useU();
  const data = convert(props.data);

  return (
    <Layout>
      <Header title="归档" url="{url}/archives" />
      <Main>
        {/*prettier-ignore*/}
        <Meta title="归档">
          {data.archives.length} 归档 × {data.categories.length} 分类 × {data.tags.length} 标签 × {data.articles} 文章 × {data.pages} 页面
        </Meta>
        <article
          css={css`
            h2 {
              font-size: ${u.fs(1.5)};
              font-weight: 400;
              border-bottom: 1px dashed ${u.c("black,1")};
              margin-top: ${u.sp(5)};
              margin-bottom: ${u.sp(3)};
              padding-bottom: ${u.sp(1)};
              position: relative;

              &::before {
                content: "";
                position: absolute;
                left: 0;
                bottom: -1px;
                display: block;
                width: ${u.fs(2)};
                height: ${u.bw(2.5)};
                background: linear-gradient(
                  ${u.c("primary7", "primary3")} 30%,
                  ${u.c("primary7", "primary3")} 70%
                );
                box-shadow: ${u.c("primary7,4", "primary3,4")} 0 3px 3px;
                border-radius: 4px;
                transition: all 0.25s ease 0s;
                z-index: 1;
              }
            }

            ul {
              list-style: none;
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
              gap: ${u.sp(4)} ${u.sp(6)};
              flex-wrap: wrap;
            }
          `}
        >
          <section>
            <h2>分类</h2>
            <ul>
              {data.categories
                .sort((i1, i2) => i2.count - i1.count)
                .map((c) => (
                  <li key={`category-${c.name}`}>
                    <Link
                      to={layout(LayoutType.CATEGORY, c.name)}
                      aria-label={`分类：${c.name}`}
                    >
                      {c.name} ({c.count})
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
          <section>
            <h2>归档</h2>
            <ul>
              {data.archives
                .sort((i1, i2) => i2.name.localeCompare(i1.name))
                .map((a) => (
                  <li key={`archive-${a.name}`}>
                    <Link
                      to={layout(LayoutType.ARCHIVE, a.name)}
                      aria-label={`归档：${a.name}`}
                    >
                      {a.name} ({a.count})
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
          <section>
            <h2>标签</h2>
            <ul
              css={css`
                flex-direction: row !important;
              `}
            >
              {data.tags
                .sort((i1, i2) => i1.name.localeCompare(i2.name))
                .map((t) => (
                  <li key={`tag-${t.name}`}>
                    <Link
                      to={layout(LayoutType.TAG, t.name)}
                      aria-label={`标签：${t.name}`}
                    >
                      #{t.name} ({t.count})
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </article>
      </Main>
      <Footer />
    </Layout>
  );
};

export default ArchivesPage;

export const query = graphql`
  query ArchivesPageQuery($status: [String!]!) {
    archives: allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: fields___date_year) {
        fieldValue
        totalCount
      }
    }
    categories: allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
    tags: allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    articles: allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      totalCount
    }
    pages: allMdx(
      filter: {
        frontmatter: { layout: { ne: "post" }, status: { in: $status } }
      }
    ) {
      totalCount
    }
  }
`;
