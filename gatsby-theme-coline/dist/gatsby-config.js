"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/gatsby-config.ts
require('dotenv/config');
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
var _remarkmath = require('remark-math'); var _remarkmath2 = _interopRequireDefault(_remarkmath);
var _remarkhtmlkatex = require('remark-html-katex'); var _remarkhtmlkatex2 = _interopRequireDefault(_remarkhtmlkatex);
var _remarkgfm = require('remark-gfm'); var _remarkgfm2 = _interopRequireDefault(_remarkgfm);
var _mdx = require('@code-hike/mdx');
var _onedarkprojson = require('shiki/themes/one-dark-pro.json'); var _onedarkprojson2 = _interopRequireDefault(_onedarkprojson);

// src/queries/init/feed.ts
var description = `
  query InitFeedDescriptionQuery {
    seoJson {
      title
      description
      site_url: url
      siteUrl: url
    }
  }
`;
var query = `
  query InitFeedQuery {
    allMdx(
      filter: {frontmatter: {layout: {eq: "post"}, status: {in: ["publish"]}}}
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields {
          slug
        }
        excerpt
      }
    }
    seoJson {
      url
    }
  }
`;
var convert = (data) => {
  return data.allMdx.nodes.map((node) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    description: node.excerpt,
    guid: data.seoJson.url + node.fields.slug,
    url: data.seoJson.url + node.fields.slug
  }));
};

// src/queries/init/search.ts
var query2 = `
  query InitSearchQuery {
    allMdx(filter: { frontmatter: { status: { in: ["publish"] } } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          categories
          tags
        }
        excerpt
        body
      }
    }
  }
`;
var convert2 = (data) => {
  return data.allMdx.nodes.map((node) => ({
    objectID: node.id,
    link: node.fields.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    categories: node.frontmatter.categories || void 0,
    tags: node.frontmatter.tags || void 0,
    excerpt: node.excerpt,
    content: node.body
  }));
};

// src/gatsby-config.ts
var config = () => {
  const seo = _fsextra2.default.readJsonSync("content/settings/seo.json");
  const metadata = {
    title: seo.title,
    siteUrl: seo.url,
    description: seo.description,
    language: seo.language
  };
  const plugins = [
    // 数据源
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "content/posts/"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "content/pages/"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "settings",
        path: "content/settings/"
      }
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
          "gatsby-remark-images"
        ],
        mdxOptions: {
          remarkPlugins: [
            _remarkgfm2.default,
            _remarkmath2.default,
            _remarkhtmlkatex2.default,
            [
              _mdx.remarkCodeHike,
              {
                lineNumbers: true,
                showCopyButton: true,
                showExpandButton: true,
                autoImport: true,
                theme: _onedarkprojson2.default
              }
            ]
          ]
        }
      }
    },
    // 转换器
    {
      resolve: "gatsby-transformer-json",
      options: {
        typeName: ({ node }) => `${node.name}Json`
      }
    },
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
          backgroundColor: "transparent"
        }
      }
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
            query: query2,
            transformer: ({ data }) => convert2(data)
          }
        ],
        matchFields: ["link", "title", "date", "categories", "tags", "content"],
        concurrentQueries: false,
        skipIndexing: process.env.ALGOLIA_SKIP_INDEXING === "true"
      }
    },
    // 拓展组件
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: "#7048e8",
        showSpinner: true
      }
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
            type: "image/png"
          },
          {
            src: "/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          }
        ],
        start_url: "/",
        background_color: "#FFFFFF",
        display: "standalone",
        theme_color: "#5755d9"
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALUTICS_ID
      }
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
          "/admin"
        ]
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: description,
        setup({ query: { seoJson } }) {
          return seoJson;
        },
        feeds: [
          {
            serialize: ({ query: query3 }) => convert(query3),
            query,
            output: "/rss.xml",
            title: metadata.title
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        sitemap: `${metadata.siteUrl}/sitemap.xml`
      }
    },
    // 基础组件
    "gatsby-plugin-next-seo",
    "gatsby-plugin-smoothscroll",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: metadata.siteUrl
      }
    },
    // 基础设施
    "gatsby-plugin-pnpm",
    "gatsby-plugin-emotion"
  ];
  return {
    trailingSlash: "never",
    siteMetadata: metadata,
    plugins
  };
};
var gatsby_config_default = config;


exports.default = gatsby_config_default;
