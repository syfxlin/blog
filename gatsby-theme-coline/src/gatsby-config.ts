import "dotenv/config";
import fs from "fs-extra";
import remarkMath from "remark-math";
import remarkKatex from "remark-html-katex";
import remarkGfm from "remark-gfm";
import { GatsbyConfig } from "gatsby";
import { remarkCodeHike } from "@code-hike/mdx";
import darkTheme from "shiki/themes/one-dark-pro.json";
import * as feedQuery from "./queries/init/feed";
import * as searchQuery from "./queries/init/search";

const config = (): GatsbyConfig => {
  const seo = fs.readJsonSync("content/settings/seo.json");

  const metadata: GatsbyConfig["siteMetadata"] = {
    title: seo.title,
    siteUrl: seo.url,
    description: seo.description,
    language: seo.language,
  };

  const plugins: GatsbyConfig["plugins"] = [
    // 数据源
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "content/posts/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "content/pages/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "settings",
        path: "content/settings/",
      },
    },
    // Mdx 处理
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-external-links",
          "gatsby-remark-images",
        ],
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkMath,
            remarkKatex,
            [
              remarkCodeHike,
              {
                lineNumbers: true,
                showCopyButton: true,
                showExpandButton: true,
                autoImport: false,
                theme: darkTheme,
              },
            ],
          ],
        },
      },
    },
    // 转换器
    {
      resolve: "gatsby-transformer-json",
      options: {
        typeName: ({ node }: any) => `${node.name}Json`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
          backgroundColor: "transparent",
        },
      },
    },
    // 搜索
    {
      resolve: "gatsby-plugin-algolia",
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries: [
          {
            query: searchQuery.query,
            transformer: ({ data }: any) => searchQuery.convert(data),
          },
        ],
        matchFields: ["link", "title", "date", "categories", "tags", "content"],
        concurrentQueries: false,
        skipIndexing: process.env.ALGOLIA_SKIP_INDEXING === "true",
      },
    },
    // 拓展组件
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: "#7048e8",
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        short_name: metadata.title,
        name: `${metadata.title} | ${metadata.description}`,
        icons: [
          {
            src: "/android-icon-36x36.png",
            sizes: "36x36",
            type: "image/png",
          },
          {
            src: "/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        start_url: "/",
        background_color: "#FFFFFF",
        display: "standalone",
        theme_color: "#5755d9",
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALUTICS_ID,
      },
    },
    {
      resolve: "gatsby-plugin-advanced-sitemap",
      options: {
        exclude: [
          "/dev-404-page",
          "/404",
          "/404.html",
          "/500",
          "/500.html",
          "/offline-plugin-app-shell-fallback",
          "/admin",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: feedQuery.description,
        setup({ query: { seoJson } }: any) {
          return seoJson;
        },
        feeds: [
          {
            serialize: ({ query }: any) => feedQuery.convert(query),
            query: feedQuery.query,
            output: "/rss.xml",
            title: metadata.title,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        sitemap: `${metadata.siteUrl}/sitemap.xml`,
      },
    },
    // 基础组件
    "gatsby-plugin-next-seo",
    "gatsby-plugin-smoothscroll",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: metadata.siteUrl,
      },
    },
    // 基础设施
    "gatsby-plugin-pnpm",
    "gatsby-plugin-emotion",
  ];

  return {
    trailingSlash: "never",
    siteMetadata: metadata,
    plugins,
  };
};

export default config;
