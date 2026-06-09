import * as React from "react";
import { ReactNode } from "react";
import { COLINE_LANGUAGE } from "../../../env/public";
import { Providers } from "../../../theme/providers";
import { Analytics } from "../../root/analytics";
import { Canvas } from "../../root/canvas";
import { HelloWorld } from "../../root/hello-world";
import { ProgressBar } from "../../root/progress-bar";
import "./styles";

export interface RootProps {
  children: ReactNode;
}

export const Root: React.FC<RootProps> = async (props) => {
  return (
    <html lang={COLINE_LANGUAGE} data-theme="light" suppressHydrationWarning>
      <body>
        <Providers>
          {props.children}
          <Canvas />
          <Analytics />
          <ProgressBar />
          <HelloWorld />
        </Providers>
      </body>
    </html>
  );
};
