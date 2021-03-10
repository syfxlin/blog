import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "gatsby";
import { category } from "../utils/url";

type Props = {
  title: string;
} & SubProps;

type SubProps = {
  date: string;
  author: string;
  categories?: string[];
};

export const PageSubInfo: React.FC<SubProps> = ({
  date,
  author,
  categories
}) => {
  return (
    <SubInfo>
      <time>{date}</time>
      {" • "}
      <span>{author}</span>

      {categories && (
        <>
          {" • "}
          <ul>
            {categories.map((c, i) => (
              <li key={`category-${i}`}>
                <Link to={category(c)}>{c}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </SubInfo>
  );
};

const PageInfo: React.FC<Props> = ({ title, ...sub }) => {
  return (
    <Info>
      <Title>{title}</Title>
      <PageSubInfo {...sub} />
    </Info>
  );
};

const Info = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 400;
  text-decoration: none;
  color: ${({ theme }) => rgba(theme.text, 0.9)};
`;

const SubInfo = styled.div`
  color: ${({ theme }) => rgba(theme.text2, 0.9)};
  font-size: 0.7rem;

  time,
  ul {
    margin-right: 0.2rem;
  }

  span {
    margin-right: 0.2rem;
    margin-left: 0.2rem;
  }

  ul {
    display: inline;
    margin: 0;
    list-style: none;
  }

  li {
    display: inline;
    margin: 0;
    list-style: none;

    &:not(:last-child):after {
      content: " , ";
    }

    a {
      color: ${({ theme }) => rgba(theme.text2, 0.9)};
      font-size: 0.7rem;
    }
  }
`;

export default PageInfo;
