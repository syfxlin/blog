import fs from "fs";
import path from "path";
import { GatsbyConfig } from "gatsby";

const siteMetadata: GatsbyConfig["siteMetadata"] = {
  title: "青空之蓝",
  siteUrl: "https://blog.ixk.me",
  description:
    "Hi，欢迎来到Otstar Lin的个人博客，来自福建泉州的菜鸟，博客内容主要以Linux和Web为主，哎呀，实在写不下去了_(:з」∠)_",
  author: {
    name: "Otstar Lin",
    email: "syfxlin@gmail.com",
    avatar: "https://ixk.me/avatar-lite.png",
    image: "https://cdn.jsdelivr.net/gh/syfxlin/pic/blog/about-card.jpg",
    introduction:
      "💻Coding / 🎉GuGuGu / 🌈 Study / 🎓 College Student / 🚩 Open Source developer / 🐛 Bug making machine"
  },
  hero: {
    title: "青空之蓝",
    subtitle: "站在时光一端，回忆过往记忆。",
    link: {
      label: "Resume",
      href: "https://ixk.me/resume.pdf"
    },
    background: [
      "https://cdn.jsdelivr.net/gh/syfxlin/pic/index/assets/img/1.jpg",
      "https://cdn.jsdelivr.net/gh/syfxlin/pic/index/assets/img/2.jpg",
      "https://cdn.jsdelivr.net/gh/syfxlin/pic/index/assets/img/3.jpg",
      "https://cdn.jsdelivr.net/gh/syfxlin/pic/index/assets/img/4.jpg"
    ]
  },
  background: [
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-1.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-2.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-3.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-4.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-5.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-6.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-7.jpg",
    "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-8.jpg"
  ],
  nav: [
    {
      title: "📦折腾记录",
      url: "/category/折腾记录",
      sub: [
        {
          title: "💬站长杂谈",
          url: "/category/站长杂谈"
        },
        {
          title: "✔️分享推荐",
          url: "/category/分享推荐"
        }
      ]
    },
    {
      title: "🍻永远的好朋友",
      url: "/links"
    },
    {
      title: "📩友链申请",
      url: "/links-application"
    },
    {
      title: "📝时间日志",
      url: "https://log.ixk.me",
      sub: [
        {
          title: "⏳时光轴",
          url: "/timeline"
        }
      ]
    },
    {
      title: "🎉开发",
      url: "https://lab.ixk.me/",
      sub: [
        {
          title: "📐XK-Java – 一个轻量的 Java 框架",
          url: "https://github.com/syfxlin/xkjava"
        },
        {
          title: "📒XK-Note – 集各种神奇功能的云笔记",
          url: "https://blog.ixk.me/xknote.html"
        },
        {
          title: "📝XK-Editor(Next) – 一个支持所见即所得的的 Markdown 编辑器",
          url: "https://github.com/syfxlin/xkeditor-next"
        },
        {
          title: "📝XK-Editor – 一个支持富文本和 Markdown 的编辑器",
          url: "https://blog.ixk.me/xkeditor.html"
        },
        {
          title: "📐XK-PHP – 一个轻量的 PHP 框架",
          url: "https://github.com/syfxlin/xkphp"
        },
        {
          title: "🎨Origami – 简洁轻快的 WordPress 主题",
          url: "https://blog.ixk.me/theme-origami.html"
        }
      ]
    },
    {
      title: "😋关于我",
      url: "/about"
    },
    {
      title: "💬留言板",
      url: "/message-board"
    }
  ],
  footer: `{face} © 2017-{year} 青空之蓝 By <a href="https://ixk.me">Otstar Lin</a><br>闽ICP备 备案是不可能的<br>站点在各种灾难中运行了{date:07/01/2017 00:00:09}`,
  license: {
    label: "BY-NC-SA",
    href: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
  },
  leancloud: {
    appId: process.env.LEANCLOUD_APP_ID,
    appKey: process.env.LEANCLOUD_APP_KEY,
    serverURL: process.env.LEANCLOUD_APP_URL
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID,
    appKey: process.env.ALGOLIA_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME
  },
  aplayer: "http://music.163.com/playlist?id=387270699"
};

const sourcePath = `${__dirname}/../source`;
const sourcePlugins = fs.readdirSync(sourcePath).map((folder) => {
  return {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "docs",
      path: path.join(sourcePath, folder),
      ignore: [`**/\.*`]
    }
  };
});

const plugins: GatsbyConfig["plugins"] = [
  ...sourcePlugins,
  "gatsby-transformer-json",
  {
    resolve: "gatsby-plugin-canonical-urls",
    options: {
      siteUrl: "https://blog.ixk.me"
    }
  },
  "gatsby-plugin-styled-components",
  "gatsby-plugin-typescript",
  {
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: process.env.GOOGLE_ANALUTICS_ID
    }
  },
  "gatsby-plugin-less",
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
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
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
        "gatsby-remark-external-links"
      ]
    }
  },
  "gatsby-plugin-offline",
  "gatsby-plugin-sitemap",
  {
    resolve: `gatsby-plugin-feed-mdx`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMdx } }: any) => {
            // eslint-disable-next-line
            return allMdx.edges.map(
              (edge: {
                node: {
                  fields: { slug: string };
                  frontmatter: { title: string; date: string };
                  excerpt: string;
                };
              }) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/" + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + "/" + edge.node.fields.slug
                });
              }
            );
          },
          query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { fields: { layout: { eq: "post" } } }
              ) {
                edges {
                  node {
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                    excerpt
                  }
                }
              }
            }
          `,
          output: "/rss.xml",
          title: "青空之蓝"
        }
      ]
    }
  },
  "gatsby-plugin-smoothscroll",
  "gatsby-plugin-mdx-embed",
  {
    resolve: "gatsby-plugin-next-seo",
    options: {
      titleTemplate: `%s | ${siteMetadata.title}`,
      description: siteMetadata.description,
      openGraph: {
        type: "website",
        locale: "zh_CN",
        site_name: siteMetadata.title,
        url: siteMetadata.siteUrl,
        description: siteMetadata.description
      },
      twitter: {
        handle: "@syfxlin",
        site: "@syfxlin",
        cardType: "summary_large_image"
      },
      metaTags: [
        {
          name: "keywords",
          content:
            "Otstar Lin, otstar, syfxlin, blog, 博客, Java, Web, Linux, XK-Lab"
        },
        {
          httpEquiv: "Content-Security-Policy",
          content: "block-all-mixed-content"
        }
      ],
      linkTags: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        }
      ]
    }
  },
  {
    resolve: "gatsby-plugin-algolia",
    options: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      queries: [
        {
          query: `
              {
                allMdx {
                  nodes {
                    objectID: id
                    fields {
                      link
                    }
                    frontmatter {
                      categories
                      tags
                      date(formatString: "YYYY-MM-DD")
                      title
                    }
                    rawBody
                    excerpt
                  }
                }
              }
            `,
          transformer: ({ data }: any) =>
            data.allMdx.nodes.map(
              (node: {
                objectID: string;
                fields: { link: string };
                frontmatter: {
                  categories: string[] | null;
                  tags: string[] | null;
                  date: string;
                  title: string;
                };
                rawBody: string;
                excerpt: string;
              }) => ({
                objectID: node.objectID,
                title: node.frontmatter.title,
                rawBody: node.rawBody,
                categories: node.frontmatter.categories,
                tags: node.frontmatter.tags,
                date: node.frontmatter.date,
                link: node.fields.link,
                excerpt: node.excerpt
              })
            )
        }
      ],
      matchFields: ["title", "rawBody", "categories", "tags", "date", "link"],
      concurrentQueries: false,
      skipIndexing: process.env.ALGOLIA_SKIP_INDEXING // default: false, useful for e.g. preview deploys or local development
    }
  },
  "gatsby-plugin-catch-links"
];

export default {
  siteMetadata,
  plugins
};
