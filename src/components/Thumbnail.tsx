import React from "react";
import styled from "styled-components";

type Props = {
  url: string;
};

const Thumbnail: React.FC<Props> = ({ url }) => {
  return <StyledThumb style={{ backgroundImage: `url(${url})` }} />;
};

const StyledThumb = styled.div`
  margin: -1.3rem -1.5rem 0;
  height: 17rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Thumbnail;
