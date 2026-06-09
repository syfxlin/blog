import * as React from "react";
import { ErrorFound } from "../components/layouts/error-found";
import { Root } from "../components/layouts/root";

export default function NotFoundPage() {
  return (
    <Root>
      <ErrorFound code={404} message="Not Found" />
    </Root>
  );
}
