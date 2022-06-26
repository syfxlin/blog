import React from "react";
import { useU } from "@syfxlin/ustyled";
import { useAsync } from "react-use";
import { Link } from "../components/Link";
import { join } from "../utils/urls";
import { convert } from "../queries/page";
import { MetaInfo } from "../components/MetaInfo";
import { css } from "@emotion/react";

export type PostCardProps = {
  link: string;
};

const PostCard: React.FC<PostCardProps> = ({ link }) => {
  const { u } = useU();
  // prettier-ignore
  const query = useAsync(async () => {
    const res = await fetch(join("page-data", link, "page-data.json"));
    if (res.status >= 400) {
      throw new Error(`Fetch post data, response code: ${res.status}`);
    }
    return await res.json();
  }, [link]);

  if (query.loading || query.error) {
    return (
      <Link
        to={link}
        aria-label={`文章：${link}`}
        css={css`
          display: flex;
          margin-top: ${u.sp(4)};
          margin-bottom: ${u.sp(4)};
        `}
      >
        文章：{link}
      </Link>
    );
  }

  const article = convert(query.value.result.data);

  return (
    <div
      css={css`
        position: relative;
        padding: ${u.sp(5)} ${u.sp(6)};
        background: ${u.c("gray3,3", "gray6,3")};
        overflow: hidden;
        margin-top: ${u.sp(4)};
        margin-bottom: ${u.sp(4)};
        display: flex;
        flex-direction: column;
        gap: ${u.sp(2)};
        font-size: ${u.fs(0.9)};

        &:after {
          position: absolute;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z%22%2F%3E%3C%2Fsvg%3E");
          background-position: center;
          background-repeat: no-repeat;
          content: "";
          height: 150px;
          width: 150px;
          right: -30px;
          top: -35px;
          opacity: 0.1;
        }

        a {
          border-bottom: none !important;
        }
      `}
    >
      <Link to={article.link} aria-label={`文章：${article.title}`}>
        {article.title}
      </Link>
      <section>{article.excerpt}</section>
      <MetaInfo
        date={article.dateCreated}
        categories={article.categories}
        tags={article.tags}
      />
    </div>
  );
};

export default PostCard;
