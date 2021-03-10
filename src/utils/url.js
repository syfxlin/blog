const isAbs = (url) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

const layout = (slug, layout, siteUrl) => {
  if (isAbs(slug)) {
    return slug;
  }
  if (layout === "page") {
    layout = "";
  }
  return join(siteUrl || "/", layout, slug);
};

const post = (slug, siteUrl) => {
  return layout(slug, "post", siteUrl);
};

const page = (slug, siteUrl) => {
  return layout(slug, "page", siteUrl);
};

const category = (slug, siteUrl) => {
  return layout(slug, "category", siteUrl);
};

const tag = (slug, siteUrl) => {
  return layout(slug, "tag", siteUrl);
};

const archive = (slug, siteUrl) => {
  return layout(slug, "archive", siteUrl);
};

const join = (...paths) => {
  return (
    "/" +
    paths
      .map((path) => `${path || ""}`.replace(/^\/|\/$/g, ""))
      .filter((path) => path)
      .join("/")
  );
};

module.exports = {
  isAbs,
  post,
  page,
  category,
  tag,
  archive,
  layout,
  join
};
