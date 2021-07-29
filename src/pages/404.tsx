import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../theme";
import Footer from "../layouts/Footer";
import Head from "../components/Head";

const Page404: React.FC = () => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme.light}>
        <Head title={"404 Not Found"} />
        <StyledMain>
          <section>
            <h2>404</h2>
            <h2>Not Found</h2>
          </section>
          <section>未找到所请求的资源。</section>
          <section>
            <a href="/" className="btn">
              首页
            </a>
            <a href="javascript:history.back();" className="btn">
              返回上一页
            </a>
          </section>
        </StyledMain>
        <Footer align={"center"} />
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > * {
    width: 100%;
  }
`;

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  transform: translateY(10%);

  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    margin-top: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  h2:first-child {
    padding-right: 1rem;
    border-right: 0.1rem solid;
  }

  h2:last-child {
    padding-left: 0.8rem;
    font-size: 1rem;
  }
`;

export default Page404;
