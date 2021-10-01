import { GatsbyConfig } from "gatsby";
import * as feedQuery from "./query/feed";
import * as indexQuery from "./query/algolia";
import seo from "../content/settings/seo.json";
import remarkMath from "remark-math";
import remarkHtmlKatex from "remark-html-katex";

const siteMetadata: GatsbyConfig["siteMetadata"] = {
  title: seo.title,
  siteUrl: seo.url,
  description: seo.description,
  language: seo.language
};

const plugins: GatsbyConfig["plugins"] = [
  // CMS
  {
    resolve: "gatsby-plugin-netlify-cms",
    options: {
      modulePath: `${__dirname}/../src/cms/index.js`
    }
  },
  // 数据源
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "posts",
      path: `${__dirname}/../content/posts/`
    }
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "pages",
      path: `${__dirname}/../content/pages/`
    }
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "settings",
      path: `${__dirname}/../content/settings/`
    }
  },
  // Mdx 处理
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [".mdx", ".md"],
      remarkPlugins: [remarkMath, remarkHtmlKatex],
      gatsbyRemarkPlugins: [
        {
          resolve: "gatsby-remark-responsive-iframe",
          options: {
            wrapperStyle: "margin-bottom: 1rem"
          }
        },
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-smartypants",
        "gatsby-remark-autolink-headers",
        "gatsby-remark-katex",
        "gatsby-remark-external-links",
        "gatsby-remark-images-remote"
      ]
    }
  },
  // 项目基础
  "gatsby-plugin-styled-components",
  {
    resolve: "gatsby-plugin-typescript",
    options: {
      isTSX: true,
      allExtensions: true
    }
  },
  "gatsby-plugin-less",
  // 转换器
  {
    resolve: "gatsby-transformer-json",
    options: {
      typeName: ({ node }: any) => `${node.name}Json`
    }
  },
  "gatsby-plugin-image",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  {
    resolve: "gatsby-plugin-canonical-urls",
    options: {
      siteUrl: "https://blog.ixk.me"
    }
  },
  // 额外文件
  {
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: process.env.GOOGLE_ANALUTICS_ID
    }
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      short_name: "青空之蓝",
      name: "青空之蓝 | 站在时光一端，回忆过往记忆。",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      start_url: "/",
      background_color: "#FFFFFF",
      display: "standalone",
      theme_color: "#5755d9"
    }
  },
  "gatsby-plugin-offline",
  "gatsby-plugin-advanced-sitemap",
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
          title: "青空之蓝"
        }
      ]
    }
  },
  {
    resolve: "gatsby-plugin-robots-txt",
    options: {
      sitemap: `${siteMetadata.siteUrl}/sitemap.xml`
    }
  },
  // 搜索
  {
    resolve: "gatsby-plugin-algolia",
    options: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      queries: [
        {
          query: indexQuery.query,
          transformer: ({ data }: any) => indexQuery.convert(data)
        }
      ],
      matchFields: [
        "link",
        "title",
        "author",
        "date",
        "categories",
        "tags",
        "content"
      ],
      concurrentQueries: false,
      skipIndexing: process.env.ALGOLIA_SKIP_INDEXING // default: false, useful for e.g. preview deploys or local development
    }
  },
  // 其他
  "gatsby-plugin-smoothscroll",
  "gatsby-plugin-mdx-embed",
  "gatsby-plugin-next-seo",
  "gatsby-plugin-catch-links"
];

export default {
  siteMetadata,
  plugins
};
