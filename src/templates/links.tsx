import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { FriendsData } from "../query/types";
import FriendCard from "../components/FriendCard";
import Page from "../components/Page";
import { TocItem } from "../components/Toc";
import { convert as convertPage } from "./page";

type Props = {
  data: QueryData;
  pageContext: {
    link: string;
    layout: string;
  };
};

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const FriendsPage: React.FC<Props> = (props) => {
  const data = convert(props.data);
  return (
    <Page
      data={data}
      pageContext={props.pageContext}
      render={(article) => (
        <>
          {article}
          <List className={"columns grid-md"}>
            {shuffle(data.links).map((link) => (
              <li className={"column col-6 col-md-12"} key={link.name}>
                <FriendCard {...link} />
              </li>
            ))}
          </List>
          {data.lostConnection.length > 0 && (
            <>
              <h2>无法访问的友链</h2>
              <ul>
                {data.lostConnection.map((link) => (
                  <li key={link.name}>
                    <a href={link.url} target={"_blank"} rel={"noreferrer"}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    />
  );
};

const List = styled.ul`
  list-style: none;
`;

export default FriendsPage;

type QueryData = {
  linksJson: {
    links: {
      name: string;
      url: string;
      author: string;
      bio: string;
      avatar: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    }[];
    lostConnection: {
      name: string;
      url: string;
    }[];
  };
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      date_updated: string;
      thumbnail: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      } | null;
      categories: string[] | null;
      tags: string[] | null;
    };
    fields: {
      slug: string;
    };
    tableOfContents: { items: TocItem[] };
    body: string;
    excerpt: string;
  };
  authorJson: {
    firstName: string;
    lastName: string;
  };
};

export const query = graphql`
  query FriendsQuery($link: String!) {
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
      tableOfContents
      body
      excerpt
    }
    authorJson {
      firstName
      lastName
    }
  }
`;

export const convert = (data: QueryData): FriendsData => {
  return {
    links: data.linksJson.links.map((link) => ({
      name: link.name,
      url: link.url,
      author: link.author,
      bio: link.bio,
      avatar: link.avatar.childImageSharp.gatsbyImageData
    })),
    lostConnection: data.linksJson.lostConnection,
    ...convertPage(data)
  };
};
