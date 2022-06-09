import loadable from "@loadable/component";
import React from "react";

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
  return (
    <>
      <div id="nc-root" />
      <CMS />
    </>
  );
};

export default AdminPage;
