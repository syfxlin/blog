import * as React from "react";
import { UstyledProvider } from "@syfxlin/ustyled";
import { NormalizeCSS } from "../theme/NormalizeCSS";
import { GlobalStyles } from "../theme/GlobalStyles";
import { Main } from "../layout/Main";
import { Header } from "../layout/Header";

// markup
const IndexPage = (props: any) => {
  return (
    <UstyledProvider>
      <NormalizeCSS />
      <GlobalStyles />
      {/*<TestColor>*/}
      {/*  <Link to={"https://ixk.me/admin"}>Link</Link>*/}
      {/*  <Button>Button</Button>*/}
      {/*  <Button>*/}
      {/*    <Github />*/}
      {/*  </Button>*/}
      {/*  <LinkButton to={"https://blog.ixk.me/admin"}>LinkButton</LinkButton>*/}
      {/*</TestColor>*/}
      <Header></Header>
      <Main></Main>
    </UstyledProvider>
  );
};

export default IndexPage;
