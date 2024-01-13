import { depker, docker, nextjs } from "https://raw.githubusercontent.com/syfxlin/depker/master/mod.ts";

const app = depker();

app.master(docker({ type: "https" }));
app.runner(docker({ type: "local" }));

app.service(
  nextjs({
    name: "blog",
    domain: "blog.ixk.me",
    tls: true,
    secrets: {
      NEXT_PUBLIC_COLINE_LANGUAGE: "@BLOG_COLINE_LANGUAGE",
      NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS: "@BLOG_COLINE_GOOGLE_ANALYTICS",
      NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME: "@BLOG_COLINE_ARTALK_SITE_NAME",
      NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL: "@BLOG_COLINE_ARTALK_SERVER_URL",
      NEXT_PUBLIC_COLINE_GITHUB_REPO: "@BLOG_COLINE_GITHUB_REPO",
      COLINE_GITHUB_TOKEN: "@BLOG_COLINE_GITHUB_TOKEN",
      KEYSTATIC_SECRET: "@BLOG_KEYSTATIC_SECRET",
      KEYSTATIC_GITHUB_CLIENT_ID: "@BLOG_KEYSTATIC_GITHUB_CLIENT_ID",
      KEYSTATIC_GITHUB_CLIENT_SECRET: "@BLOG_KEYSTATIC_GITHUB_CLIENT_SECRET",
      NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: "@BLOG_KEYSTATIC_GITHUB_APP_SLUG",
    },
  }),
);

export default app;
