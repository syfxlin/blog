import * as React from "react";
import { ErrorFound } from "../layouts/ErrorFound";
import { Layout } from "../layouts/Layout";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <ErrorFound code={404} message="Not Found" />
    </Layout>
  );
};

export default NotFoundPage;
