import * as React from "react";
import { Root } from "../layouts/Root";
import { ErrorFound } from "../layouts/ErrorFound";

const InternalServerErrorPage: React.FC = Root(() => {
  return <ErrorFound code={500} message="Internal Server Error" />;
});

export default Root(InternalServerErrorPage);
