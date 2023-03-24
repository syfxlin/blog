import React from "react";
import loadable from "@loadable/component";
import { CMSProps } from "../cms";
import { css } from "@emotion/react";
import { Root } from "../layouts/Root";

const CMS = loadable(
  async (props: CMSProps) => {
    const cms = await import("../cms");
    cms.init(props);
    return { default: () => null } as any;
  },
  { ssr: false }
);

const AdminPage: React.FC = () => {
  return (
    <>
      <div
        id="nc-root"
        css={css`
          min-height: 100vh;
        `}
      />
      <CMS
        prefix={process.env.GATSBY_CMS_PREFIX}
        backend={JSON.parse(process.env.GATSBY_CMS_BACKEND as string)}
      />
    </>
  );
};

export default Root(AdminPage);
