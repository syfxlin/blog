import { GatsbyConfig } from "gatsby";
import remarkMath from "remark-math";
import remarkKatex from "remark-html-katex";
import seo from "./content/settings/seo.json";

const siteMetadata: GatsbyConfig["siteMetadata"] = {
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
      name: "settings",
      path: "content/settings/",
    },
  },
  // Mdx 处理
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [".mdx", ".md"],
      remarkPlugins: [remarkMath, remarkKatex],
      gatsbyRemarkPlugins: [
        "gatsby-remark-responsive-iframe",
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-smartypants",
        "gatsby-remark-autolink-headers",
        "gatsby-remark-external-links",
      ],
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
  // 基础组件
  "gatsby-plugin-next-seo",
  // 基础设施
  "gatsby-plugin-pnpm",
  "gatsby-plugin-emotion",
];

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata,
  plugins,
};

export default config;
