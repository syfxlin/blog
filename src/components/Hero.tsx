import React, { useState } from "react";
import styled from "styled-components";
import { useInterval } from "react-use";
import { rgba } from "polished";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { BgImage } from "gbimage-bridge";

type Props = {
  title: string;
  subtitle: string;
  link: {
    label?: string;
    href?: string;
  };
  background: IGatsbyImageData[];
};

const Hero: React.FC<Props> = ({ title, subtitle, link, background }) => {
  const [index, setIndex] = useState(0);
  useInterval(() => {
    setIndex(index + 1 >= background.length ? 0 : index + 1);
  }, 10000);
  return (
    <StyledContainer>
      <StyledImages>
        {background.map((image, i) => (
          <div
            key={`hero-${i}`}
            style={{
              opacity: i === index ? 1 : 0
            }}
          >
            <BgImage image={image} />
          </div>
        ))}
      </StyledImages>
      <StyledTitle>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        {link.href && link.label && <a href={link.href}>{link.label}</a>}
      </StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: -0.4rem;
  margin-right: -0.4rem;
`;

const StyledImages = styled.div`
  position: relative;
  width: 100%;
  min-height: 260px;
  box-shadow: 2px 3px 4px ${({ theme }) => theme.shadow};
  border-radius: 8px;
  overflow: hidden;

  > div {
    border-radius: 8px;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 3s;

    &:first-child {
      opacity: 1;
    }

    > div {
      width: 100%;
      height: 100%;
    }
  }

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => rgba(theme.dark.background, 0.3)};
    border-radius: 8px;
  }
`;

const StyledTitle = styled.div`
  text-align: center;
  position: absolute;
  color: ${({ theme }) => rgba(theme.dark.text, 0.9)};

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1rem;
  }

  a {
    margin-top: 0.2rem;
    color: ${({ theme }) => rgba(theme.dark.text, 0.9)};
    border: 0.05rem solid ${({ theme }) => rgba(theme.dark.text, 0.9)};
    border-radius: 0.1rem;
    line-height: 1.2rem;
    outline: 0;
    padding: 0.1rem 0.4rem;
    display: inline-block;
    text-decoration: none;
  }
`;

export default Hero;
