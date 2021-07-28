import React from "react";
import styled from "styled-components";

type Props = {
  date: string;
};

const Expire: React.FC<Props> = ({ date }) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const now = new Date();
  const last = new Date(date);
  const diffDay = Math.round(
    Math.abs((now.getTime() - last.getTime()) / oneDay)
  );
  if (diffDay < 180) {
    return null;
  }
  return (
    <StyledExpire>
      本文最后更新于 {diffDay} 天前，文中所描述的信息可能已发生改变
    </StyledExpire>
  );
};

const StyledExpire = styled.div`
  background-color: #ffffd2;
  color: #947600;
  font-size: 0.75rem;
  margin: 1rem -1.5rem 0;
  padding: 1.25em 1.5em;
`;

export default Expire;
