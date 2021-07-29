import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { rgba } from "polished";
import { useFetchJson } from "../utils/useFetchJson";
import { join } from "../utils/url";
import { PageSubInfo } from "../components/PageInfo";
import { convert } from "../templates/page";

type Props = {
  link: string;
};

const usePost = (link: string) =>
  useFetchJson(join("page-data", link, "page-data.json"));

const PostCard: React.FC<Props> = ({ link }) => {
  const data = usePost(link);
  if (data.loading || data.error) {
    return <Link to={link}>{link}</Link>;
  }
  const article = convert(data.value.result.data);
  return (
    <StyledCard>
      <Link to={link}>
        <Title>{article.title}</Title>
        <Excerpt>{article.excerpt}</Excerpt>
        <PageSubInfo
          date={article.dateCreated}
          author={article.author}
          categories={article.categories}
        />
      </Link>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => rgba(theme.divider, 0.1)};
  border-radius: 0.4rem;
  padding: 0.6rem 1rem;
  background: ${({ theme }) => rgba(theme.background, 0.75)};
  box-shadow: 0 1px 15px -6px ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;
  margin-bottom: 0.6rem;

  &:after {
    position: absolute;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z%22%2F%3E%3C%2Fsvg%3E");
    background-position: center;
    background-repeat: no-repeat;
    content: " ";
    height: 150px;
    width: 150px;
    right: -30px;
    top: -25px;
    opacity: 0.1;
  }
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  color: ${({ theme }) => rgba(theme.text, 0.9)};
`;

const Excerpt = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => rgba(theme.text, 0.9)};
`;

export default PostCard;
