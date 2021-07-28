import React from "react";
import styled from "styled-components";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { BgImage } from "gbimage-bridge";

type Props = {
  image: IGatsbyImageData;
};

const Thumbnail: React.FC<Props> = ({ image }) => {
  return (
    <StyledThumb>
      <BgImage image={image} />
    </StyledThumb>
  );
};

const StyledThumb = styled.div`
  margin: -1.3rem -1.5rem 0;
  height: 17rem;

  > div {
    width: 100%;
    height: 100%;
  }
`;

export default Thumbnail;
