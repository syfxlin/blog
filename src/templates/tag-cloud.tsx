import React from "react";
import { graphql, Link } from "gatsby";
import { TagsData } from "../query/types";
import Layout from "../layouts/Layout";
import { join, tag } from "../utils/url";
import SplitPanel from "../layouts/SplitPanel";
import styled from "styled-components";
import Card from "../components/Card";
import { StyledCard } from "../components/StyledCard";

type Props = {
  data: QueryData;
};

const TagCloudPage: React.FC<Props> = (props) => {
  const data = convert(props.data);
  const counts = data.map((item) => item.count);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  const fontSize = (count: number) => {
    const diff = 0.65 / (max - min);
    return 0.75 + diff * (count - min);
  };
  return (
    <Layout title={`标签云`} url={join("tags")}>
      <SplitPanel>
        <StyledCard>
          <h1>标签云</h1>
          <span>共 {data.length} 个标签</span>
        </StyledCard>
        <Content>
          {data.map((item, i) => (
            <Tag
              key={`tag-${i}`}
              to={tag(item.name)}
              fontSize={fontSize(item.count)}
            >
              #{item.name}
            </Tag>
          ))}
        </Content>
      </SplitPanel>
    </Layout>
  );
};

const Content = styled(Card)`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled(Link)<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}rem;
  color: hsl(241deg ${({ fontSize }) => fontSize * 60}% 69%);
  text-decoration: none;
  padding: 0.5rem;
  line-height: 2;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export default TagCloudPage;

type QueryData = {
  allDirectusArticle: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

export const query = graphql`
  query TagsPageQuery($status: [String!]!) {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: $status } }
    ) {
      group(field: tags___tag_id___name) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): TagsData => {
  return data.allDirectusArticle.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
