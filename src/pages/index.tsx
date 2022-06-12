import * as React from "react";
import { Main } from "../layouts/Main";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { Hero } from "../components/Hero";
import { graphql, useStaticQuery } from "gatsby";
import { Card } from "../components/Card";

const IndexPage = () => {
  const items = useStaticQuery(graphql`
    query ListPageQuery {
      allMdx(
        skip: 0
        limit: 10
        filter: { frontmatter: { layout: { eq: "post" } } }
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
  `);
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <section>
          {items.allMdx.nodes.map((i: any) => (
            <Card
              key={i.fields.slug}
              title={i.frontmatter.title}
              link={i.fields.slug}
              date={i.frontmatter.date}
              excerpt={i.excerpt}
              thumbnail={i.frontmatter.thumbnail}
              categories={i.frontmatter.categories}
              tags={i.frontmatter.tags}
            />
          ))}
        </section>
      </Main>
      <Footer />
    </>
  );
};

export default IndexPage;
