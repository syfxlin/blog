import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import styled from "styled-components";

interface SharpResult {
  aspectRatio: number;
  src: string;
  srcSet?: string;
  srcWebp?: string;
  srcSetWebp?: string;
  base64?: string;
  tracedSVG?: string;

  // fixed, resize
  width?: number;
  height?: number;

  // fluid
  presentationHeight?: number;
  presentationWidth?: number;
  sizes?: string;
  originalImg?: string;
}
type SharpMethod = "fluid" | "fixed" | "resize";

interface CreateMarkupArgs extends SharpResult {
  sharpMethod: SharpMethod;
  originSrc: string;
  title?: string;
  alt?: string;
}

const Image: React.FC<CreateMarkupArgs> = ({ src, alt, title }) => {
  return (
    <Zoom zoomMargin={40}>
      <picture>
        <source src={src} />
        <StyledImage src={src} title={title} alt={alt} loading="lazy" />
      </picture>
    </Zoom>
  );
};

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export default Image;
