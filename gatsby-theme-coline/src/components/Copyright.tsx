import React from "react";
import { Link } from "./Link";
import { useLicenseData } from "../queries/license";
import { useAuthorData } from "../queries/author";
import { useSeoData } from "../queries/seo";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type CopyrightProps = {
  title: string;
  link: string;
  date: string;
};

export const Copyright: React.FC<CopyrightProps> = (props) => {
  const { u } = useU();
  const seo = useSeoData();
  const license = useLicenseData();
  const author = useAuthorData();
  return (
    <section
      css={css`
        position: relative;
        font-size: ${u.fs(0.6)};
        background: ${u.c("blue2,3", "blue4,3")};
        color: ${u.c("gray7", "dark0")};
        display: block;
        overflow: hidden;
        margin-top: ${u.sp(4)};
        padding: ${u.sp(5)} ${u.sp(6)};

        &::after {
          position: absolute;
          background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'%3E%3Cpath fill='%234a4a4a' d='M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-20-27.4-20-22.2 0-33.3 14.6-33.3 43.9 0 23.5 9.2 43.8 33.3 43.8 14.4 0 24.6-7 30.5-21.3l30.6 15.5a73.2 73.2 0 01-65.1 39c-22.6 0-74-10.3-74-77 0-58.7 43-77 72.6-77 30.8-.1 52.7 11.9 66 35.8zm143 0l-32.7 17.3c-9.5-19.8-25.7-20-27.9-20-22.1 0-33.2 14.6-33.2 43.9 0 23.5 9.2 43.8 33.2 43.8 14.5 0 24.7-7 30.5-21.3l31 15.5c-2 3.8-21.3 39-65 39-22.7 0-74-9.9-74-77 0-58.7 43-77 72.6-77C354 179 376 191 389 214.8zM247.7 8C104.7 8 0 123 0 256c0 138.4 113.6 248 247.6 248C377.5 504 496 403 496 256 496 118 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.5 85.5-203.3 203.8-203.3A201.7 201.7 0 01451.3 256c0 121.7-99.7 202.9-202.9 202.9z'/%3E%3C/svg%3E");
          content: "";
          height: 200px;
          width: 200px;
          right: -40px;
          top: -45px;
          opacity: 0.1;
        }

        p {
          margin: 0;
        }

        & > p {
          font-size: ${u.fs(0.9)};
        }

        & > ul {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          list-style: none;
          margin: ${u.sp(3)} 0;
          padding: 0;
          gap: ${u.sp(6)};

          p:last-of-type {
            font-size: ${u.fs(0.9)};
          }
        }
      `}
    >
      <p>{props.title}</p>
      <Link to={`${seo.url}${props.link}`}>
        {seo.url}
        {props.link}
      </Link>
      <ul>
        {license && (
          <li>
            <p>许可协议</p>
            <p>
              <Link to={license.href} aria-label={`许可协议：${license.label}`}>
                {license.label}
              </Link>
            </p>
          </li>
        )}
        <li>
          <p>发布于</p>
          <p>{props.date}</p>
        </li>
        <li>
          <p>本文作者</p>
          <p>
            {author.firstName} {author.lastName}
          </p>
        </li>
      </ul>
      <p>转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！</p>
    </section>
  );
};
