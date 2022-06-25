import * as React from "react";
import { ErrorFound } from "../layouts/ErrorFound";
import { Root } from "../layouts/Root";

const NotFoundPage: React.FC = () => {
  return (
    <Root>
      <ErrorFound code={404} message="Not Found" />
    </Root>
  );
};

export default NotFoundPage;
