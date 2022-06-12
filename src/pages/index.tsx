import * as React from "react";
import { Main } from "../layouts/Main";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { Hero } from "../components/Hero";

const IndexPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Hero />
      </Main>
      <Footer />
    </>
  );
};

export default IndexPage;
