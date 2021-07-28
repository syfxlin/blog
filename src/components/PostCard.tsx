import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Card from "./Card";
import { PageSubInfo } from "./PageInfo";
import { rgba } from "polished";
import TagList from "./TagList";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { BgImage } from "gbimage-bridge";

type Props = {
  title: string;
  excerpt: string;
  date: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
  link: string;
  author: string;
};

const PostCard: React.FC<Props> = ({
  title,
  thumbnail,
  tags,
  link,
  excerpt,
  categories,
  ...sub
}) => {
  return (
    <Card>
      {thumbnail && (
        <Thumbnail to={link}>
          <BgImage image={thumbnail} />
        </Thumbnail>
      )}
      <Info hasThumbnail={!!thumbnail}>
        <h2>
          <Link to={link}>{title}</Link>
        </h2>
        <PageSubInfo {...sub} categories={categories?.slice(0, 3)} />
        <Excerpt>{excerpt}</Excerpt>
        <Flex>
          {tags && <TagList tags={tags.slice(0, 3)} />}
          <More to={link}>阅读全文</More>
        </Flex>
      </Info>
    </Card>
  );
};

const Thumbnail = styled(Link)`
  height: 14rem;
  display: block;
  margin: -1.3rem -1.5rem 0 -1.5rem;

  > div {
    width: 100%;
    height: 100%;
  }
`;

const Info = styled.div<{ hasThumbnail: boolean }>`
  padding: ${({ hasThumbnail }) => (hasThumbnail ? `0.5rem` : `0`)} 0 0;

  h2 {
    margin-bottom: 0;

    a {
      font-size: 1.25rem;
      font-weight: 400;
      text-decoration: none;
      color: ${({ theme }) => rgba(theme.text, 0.9)};
      transition: color 0.3s;

      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

export const Excerpt = styled.div`
  padding: 0.2rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => rgba(theme.text, 0.9)};
`;

const Flex = styled.div`
  padding: 0.2rem 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const More = styled(Link)`
  border: 1px solid ${({ theme }) => rgba(theme.divider, 0.2)};
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  margin-top: 0.4rem;
  margin-right: 0.5rem;
  display: inline-block;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    opacity: 0.7;
    color: ${({ theme }) => theme.background};
    text-decoration: none;
    transition: all 0.5s ease-in-out;
  }
`;

export default PostCard;
