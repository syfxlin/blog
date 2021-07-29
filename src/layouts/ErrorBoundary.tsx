import styled, { ThemeProvider } from "styled-components";
import React from "react";
import theme from "../theme";
import Footer from "./Footer";
import Head from "../components/Head";

type State = {
  error: null | any;
};

export default class ErrorBoundary extends React.Component<any, State> {
  state = {
    error: null
  };

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Wrapper>
          <ThemeProvider theme={theme.light}>
            <Head title={"500 Internal Error"} />
            <StyledMain>
              <section>
                <h2>500</h2>
                <h2>Internal Error</h2>
              </section>
              <section>
                页面出现了一些问题。当您看到该页的时候欢迎您随手将这个问题发布到
                <a href="https://github.com/syfxlin/blog/issues">
                  syfxlin/blog issues
                </a>
                ，非常感谢。
              </section>
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
    } else {
      return this.props.children;
    }
  }
}

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
