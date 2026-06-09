"use client";

import * as React from "react";
import { ReactNode } from "react";
import { useIsClient } from "../../../hooks/use-is-client";

export interface ClientOnlyProps {
  children: () => ReactNode;
}

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const client = useIsClient();
  return client ? <>{children()}</> : null;
};
