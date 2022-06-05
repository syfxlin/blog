import loadable from "@loadable/component";
import React from "react";

const CMS = loadable(
  async () => {
    const cms = await import("netlify-cms-app").then((m) => m.default);
    cms.init();
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
