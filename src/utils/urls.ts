export const isAbs = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

export const layout = (
  slug: string | number,
  layout: string,
  siteUrl?: string
) => {
  slug = String(slug);
  if (isAbs(slug)) {
    return slug;
  }
  if (layout === "page") {
    layout = "";
  }
  return join(siteUrl || "/", layout, slug);
};

export const post = (slug: string, siteUrl?: string) => {
  return layout(slug, "post", siteUrl);
};

export const page = (slug: string, siteUrl?: string) => {
  return layout(slug, "page", siteUrl);
};

export const category = (slug: string, siteUrl?: string) => {
  return layout(slug, "category", siteUrl);
};

export const tag = (slug: string, siteUrl?: string) => {
  return layout(slug, "tag", siteUrl);
};

export const archive = (slug: string, siteUrl?: string) => {
  return layout(slug, "archive", siteUrl);
};

export const join = (...paths: (string | number)[]) => {
  const join = paths
    .map((path) => String(path).replace(/^\/|\/$/g, ""))
    .filter((path) => path)
    .join("/");
  return ("/" + join).toLowerCase();
};
