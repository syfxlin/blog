import React from "react";
import Header from "./Header";
import styled from "styled-components";
import Container from "./Container";
import Footer from "./Footer";
import { HeadProps } from "../components/Head";

type Props = HeadProps;

const Layout: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <Header {...props} />
      <StyledContainer>{children}</StyledContainer>
      <Footer />
    </>
  );
};

const StyledContainer = styled(Container)`
  padding-top: 4rem;
`;

export default Layout;
