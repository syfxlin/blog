import "./styles";
import React, { ReactNode } from "react";
import { fetcher } from "../../../contents";
import { Canvas } from "../../root/canvas";
import { Analytics } from "../../root/analytics";
import { Providers } from "../../../theme/providers";
import { ProgressBar } from "../../root/progress-bar";
import { HelloWorldScript } from "../../scripts/hello-world-script";

export type RootProps = {
  children: ReactNode;
};

export const Root: React.FC<RootProps> = async (props) => {
  const seo = await fetcher.seo();
  return (
    <html lang={seo.language} data-theme="light" suppressHydrationWarning>
      <body>
        <Providers>
          <HelloWorldScript />
          {props.children}
          <Canvas />
          <Analytics />
          <ProgressBar />
        </Providers>
      </body>
    </html>
  );
};
