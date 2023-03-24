import * as React from "react";
import { Root } from "../layouts/Root";
import { ErrorFound } from "../layouts/ErrorFound";

const NotFoundPage: React.FC = Root(() => {
  return <ErrorFound code={404} message="Not Found" />;
});

export default NotFoundPage;
