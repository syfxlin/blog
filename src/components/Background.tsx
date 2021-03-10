import React, { useState } from "react";
import { useInterval } from "react-use";
import styled from "styled-components";
import { rgba } from "polished";

type Props = {
  background: string[];
};

const Background: React.FC<Props> = ({ background }) => {
  const [index, setIndex] = useState(0);
  useInterval(() => {
    setIndex(index + 1 >= background.length ? 0 : index + 1);
  }, 10000);
  return (
    <StyledBackground>
      {background.map((url, i) => (
        <div
          key={`background-${i}`}
          style={{
            opacity: i === index ? 1 : 0,
            backgroundImage: `url(${url})`
          }}
        />
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
