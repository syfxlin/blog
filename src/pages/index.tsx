import * as React from "react";
import { UstyledProvider } from "@syfxlin/ustyled";
import { NormalizeCSS } from "../theme/NormalizeCSS";
import { GlobalStyles } from "../theme/GlobalStyles";
import { Main } from "../layout/Main";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

const IndexPage = () => {
  return (
    <UstyledProvider>
      <NormalizeCSS />
      <GlobalStyles />
      <Header />
      <Main></Main>
      <Footer />
    </UstyledProvider>
  );
};

export default IndexPage;
