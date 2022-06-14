import loadable from "@loadable/component";
import React from "react";
import { useU } from "@syfxlin/ustyled";

const CMS = loadable(
  async () => {
    const netlify = await import("netlify-cms-app").then((m) => m.default);
    const cms = await import("../cms");
    netlify.init({ config: cms.config });
    return { default: () => null } as any;
  },
  { ssr: false }
);

const AdminPage: React.FC = () => {
  const { css } = useU();
  return (
    <>
      <div
        id="nc-root"
        css={css`
          min-height: 100vh;
        `}
      />
      <CMS />
    </>
  );
};

export default AdminPage;
