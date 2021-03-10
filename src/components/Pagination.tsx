import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Card from "./Card";
import { join } from "../utils/url";
import classNames from "classnames";

type Props = {
  currentPage: number;
  pageSize: number;
  onPage: string | ((page: number) => void);
};

const Pagination: React.FC<Props> = ({ currentPage, pageSize, onPage }) => {
  const centerPage = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < pageSize) {
      centerPage.push(
        <li
          className={classNames("page-item", { active: currentPage === i })}
          key={`page-${i}`}
        >
          {typeof onPage === "string" ? (
            <Link to={join(onPage, i)}>{i}</Link>
          ) : (
            <a href="#" onClick={() => onPage(i)}>
              {i}
            </a>
          )}
        </li>
      );
    }
  }
  return (
    <StyledCard>
      <ul className="pagination">
        {currentPage !== 1 && (
          <li className="page-item">
            {typeof onPage === "string" ? (
              <Link to={join(onPage, currentPage - 1)} className="prev">
                <i className="icon icon-back" /> 上一页
              </Link>
            ) : (
              <a href="#" onClick={() => onPage(currentPage - 1)}>
                <i className="icon icon-back" /> 上一页
              </a>
            )}
          </li>
        )}
        <li className={classNames("page-item", { active: currentPage === 1 })}>
          {typeof onPage === "string" ? (
            <Link to={join(onPage, 1)}>1</Link>
          ) : (
            <a href="#" onClick={() => onPage(1)}>
              1
            </a>
          )}
        </li>
        {currentPage > 4 && (
          <li className="page-item">
            <span>…</span>
          </li>
        )}
        {centerPage}
        {currentPage < pageSize - 3 && (
          <li className="page-item">
            <span>…</span>
          </li>
        )}
        {pageSize !== 1 && (
          <li
            className={classNames("page-item", {
              active: currentPage === pageSize
            })}
          >
            {typeof onPage === "string" ? (
              <Link to={join(onPage, pageSize)}>{pageSize}</Link>
            ) : (
              <a href="#" onClick={() => onPage(pageSize)}>
                {pageSize}
              </a>
            )}
          </li>
        )}
        {currentPage !== pageSize && (
          <li className="page-item">
            {typeof onPage === "string" ? (
              <Link to={join(onPage, currentPage + 1)} className="next">
                下一页 <i className="icon icon-forward" />
              </Link>
            ) : (
              <a href="#" onClick={() => onPage(currentPage + 1)}>
                下一页 <i className="icon icon-forward" />
              </a>
            )}
          </li>
        )}
      </ul>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  padding-top: 0.2rem !important;
  padding-bottom: 0.2rem !important;
  display: flex;
  justify-content: center;
`;

export default Pagination;
