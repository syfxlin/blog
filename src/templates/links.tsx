import React, { useMemo } from "react";
import { graphql } from "gatsby";
import { convert } from "../queries/links";
import { PageTemplate } from "./page-template";
import { shuffle } from "../utils/vender";
import { GatsbyImage } from "gatsby-plugin-image";
import { useU } from "@syfxlin/ustyled";
import Tippy from "@tippyjs/react";
import { LinkButton } from "../components/Button";

export type FriendsPageProps = {
  data: Queries.FriendsPageQueryQuery;
  pageContext: {
    link: string;
    layout: string;
  };
};

const FriendsPage: React.FC<FriendsPageProps> = (props) => {
  const { css } = useU();

  const data = convert(props.data);
  const ctx = props.pageContext;

  const links = useMemo(() => shuffle(data.links), [data.links]);

  return (
    <PageTemplate
      link={data.link}
      title={data.title}
      dateCreated={data.dateCreated}
      dateUpdated={data.dateUpdated}
      excerpt={data.excerpt}
      body={data.body}
      thumbnail={data.thumbnail}
      categories={data.categories}
      tags={data.tags}
      toc={data.toc}
      layout={ctx.layout}
      render={(article) => (
        <>
          {article}
          <section
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: .sp(2);
            `}
          >
            {links.map((link) => (
              <LinkButton
                key={`link-${link.url}`}
                to={link.url}
                aria-label={`友链：${link.name}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                css={css`
                  display: flex;
                  gap: .sp(4);
                  text-align: left;
                  padding: .sp(4);
                `}
              >
                <GatsbyImage
                  alt={link.name}
                  image={link.avatar}
                  css={css`
                    width: .s(20);
                    height: .s(20);
                    flex-basis: .s(20);
                    border-radius: 50%;
                    overflow: hidden;
                  `}
                />
                <div
                  css={css`
                    flex: 1;
                    overflow: hidden;

                    > span {
                      display: block;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      font-size: .fs(0.9);
                      color: .c(gray7, dark0);
                      line-height: 1.5;
                    }
                  `}
                >
                  <span
                    css={css`
                      color: .c(primary7, primary3) !important;
                      font-size: .fs(1.1) !important;
                    `}
                  >
                    {link.name}
                  </span>
                  <span>{link.author ?? <span>&nbsp;</span>}</span>
                  <Tippy
                    content={link.bio}
                    animation="shift-away"
                    visible={!link.bio ? false : undefined}
                  >
                    <span>{link.bio ?? <span>No Note</span>}</span>
                  </Tippy>
                </div>
              </LinkButton>
            ))}
          </section>
        </>
      )}
    />
  );
};

export default FriendsPage;

export const query = graphql`
  query FriendsPageQuery($link: String!) {
    linksJson {
      links {
        name
        url
        author
        bio
        avatar {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      lostConnection {
        name
        url
      }
    }
    mdx(fields: { slug: { eq: $link } }) {
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
      tableOfContents
      body
    }
  }
`;
