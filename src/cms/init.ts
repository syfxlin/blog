import type { CMS } from "netlify-cms-core";

export const init = (cms: CMS) => {
  cms.registerEventListener({
    name: "preSave",
    handler: ({ entry }) => {
      const data = entry.get("data");
      if (data.get("layout") === "post") {
        return data.set("date_updated", new Date().toISOString());
      }
      return data;
    },
  });
};
