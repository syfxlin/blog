export enum LayoutType {
  POST = "post",
  PAGE = "page",
  ARCHIVE = "archive",
  CATEGORY = "category",
  TAG = "tag",
}

export const layout = (
  layout: string | LayoutType,
  ...paths: (string | number)[]
) => {
  if (layout === "page") {
    layout = "";
  }
  return join("/", layout, ...paths);
};

export const join = (...paths: (string | number)[]) => {
  const join = paths
    .map((path) => String(path).replace(/^\/|\/$/g, ""))
    .filter((path) => path)
    .join("/");
  return ("/" + join).toLowerCase();
};
