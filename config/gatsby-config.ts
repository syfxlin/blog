import { GatsbyConfig } from "gatsby";
import { convert as convertIndex, query as queryIndex } from "./query/algolia";
import {
  convert as convertFeed,
  description as queryDescription,
  query as queryFeed
} from "./query/feed";
import path from "path";

const siteMetadata: GatsbyConfig["siteMetadata"] = {
  title: "青空之蓝",
  siteUrl: "https://blog.ixk.me",
  description:
    "Hi，欢迎来到Otstar Lin的个人博客，来自福建泉州的菜鸟，博客内容主要以Linux和Web为主，哎呀，实在写不下去了_(:з」∠)_"
};

const plugins: GatsbyConfig["plugins"] = [
  // 数据源
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "friend-image",
      path: path.join(__dirname, "links")
    }
  },
  {
    resolve: "@syfxlin/gatsby-source-directus",
    options: {
      url: process.env.DIRECTUS_URL,
      token: process.env.DIRECTUS_TOKEN
    }
  },
  {
    resolve: "gatsby-source-graphql",
    options: {
      typeName: "Directus_System",
      fieldName: "directusSystem",
      url: `${process.env.DIRECTUS_URL}/graphql/system`,
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`
      }
    }
  },
  // Mdx 处理
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [".mdx", ".md"],
      remarkPlugins: [require("remark-math"), require("remark-html-katex")],
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
  "gatsby-plugin-typescript",
  "gatsby-plugin-less",
  // 转换器
  "gatsby-transformer-json",
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
    resolve: `gatsby-plugin-feed-mdx`,
    options: {
      query: queryDescription,
      setup({ query: { directusSeo } }: any) {
        return directusSeo;
      },
      feeds: [
        {
          serialize: ({ query }: any) => convertFeed(query),
          query: queryFeed,
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
          query: queryIndex,
          transformer: ({ data }: any) => convertIndex(data)
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
