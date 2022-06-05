import { GatsbyConfig } from "gatsby";
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
      name: "settings",
      path: "content/settings/",
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
