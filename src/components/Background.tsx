import React, { useState } from "react";
import { useInterval } from "react-use";
import { rgba } from "polished";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { BgImage } from "gbimage-bridge";
import styled from "styled-components";

type Props = {
  background: IGatsbyImageData[];
};

const Background: React.FC<Props> = ({ background }) => {
  const [index, setIndex] = useState(0);
  useInterval(() => {
    setIndex(index + 1 >= background.length ? 0 : index + 1);
  }, 10000);
  return (
    <StyledBackground>
      {background.map((image, i) => (
        <div style={{ opacity: i === index ? 1 : 1 }} key={`background-${i}`}>
          <BgImage image={image} />
        </div>
      ))}
    </StyledBackground>
  );
};

const StyledBackground = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -999;

  div {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    z-index: -999;
    opacity: 0;
    position: absolute;
    transition: opacity 3s;
  }

  &:after {
    position: fixed;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: ${({ theme }) => rgba(theme.background, 0.75)};
  }
`;

export default Background;
