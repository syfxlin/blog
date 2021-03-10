import fs from "fs";
import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { archive, category, join, layout, tag } from "../src/utils/url";
import {
  CreateNodeArgs,
  CreatePagesArgs,
  GatsbyNode,
  SourceNodesArgs
} from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  plugins
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "global.GENTLY": false
      })
    ]
  });
};

export const onCreateNode = ({
  node,
  actions,
  getNode
}: CreateNodeArgs<any>): GatsbyNode["onCreateNode"] => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    // 链接
    const slug = node.frontmatter.slug || createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "link",
      value: layout(slug, node.frontmatter.layout || "post")
    });
    createNodeField({
      node,
      name: "slug",
      value: layout(slug, node.frontmatter.layout || "post")
    });

    // 布局
    createNodeField({
      node,
      name: "layout",
      value: node.frontmatter.layout || "post"
    });

    // 日期时间，用于查询
    const date = new Date(node.frontmatter.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const year_month = `${year}-${month}`;
    const day = date.getDate();
    createNodeField({ node, name: "year", value: `${year}` });
    createNodeField({ node, name: "month", value: `${month}` });
    createNodeField({ node, name: "yearMonth", value: year_month });
    createNodeField({ node, name: "day", value: `${day}` });
  }
  return undefined;
};

export const createPages = async ({
  graphql,
  actions
}: CreatePagesArgs & {
  traceId: "initial-createPages";
}): Promise<GatsbyNode["createPages"]> => {
  const { createPage } = actions;

  const createPagination = (
    size: number,
    path: string,
    component: string,
    context?: Record<string, any>
  ) => {
    const perPage = 10;
    const pageSize = Math.ceil(size / perPage);
    createPage({
      path,
      component,
      context: {
        limit: perPage,
        skip: 0,
        pageSize,
        currentPage: 1,
        ...context
      }
    });
    for (let i = 0; i < pageSize; i++) {
      createPage({
        path: join(path, "page", i + 1),
        component,
        context: {
          limit: perPage,
          skip: i * perPage,
          pageSize,
          currentPage: i + 1,
          ...context
        }
      });
    }
  };

  const res = await graphql<{
    allMdx: {
      nodes: {
        fields: {
          link: string;
          layout: string;
        };
        frontmatter: {
          title: string;
        };
      }[];
    };
    categories: {
      group: {
        fieldValue: string;
        totalCount: number;
      }[];
    };
    tags: {
      group: {
        fieldValue: string;
        totalCount: number;
      }[];
    };
    archives: {
      group: {
        fieldValue: string;
        totalCount: number;
      }[];
    };
  }>(`
    query CreatePagesQuery {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          fields {
            link
            layout
          }
          frontmatter {
            title
          }
        }
      }
      categories: allMdx(filter: { fields: { layout: { eq: "post" } } }) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
      tags: allMdx(filter: { fields: { layout: { eq: "post" } } }) {
        group(field: frontmatter___tags, limit: 20) {
          fieldValue
          totalCount
        }
      }
      archives: allMdx(filter: { fields: { layout: { eq: "post" } } }) {
        group(field: fields___year) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  // 文章或其他类型的页面，通过 layout 区分
  const data = res.data;
  if (!data) {
    return undefined;
  }
  const nodes = data.allMdx.nodes;
  const pages = nodes.filter((n) => n.fields.layout !== "post");
  pages.forEach((page) => {
    createPage({
      path: `${page.fields.link}`,
      component: path.resolve(`src/templates/${page.fields.layout}.tsx`),
      context: {
        link: `${page.fields.link}`,
        layout: page.fields.layout
      }
    });
  });

  const posts = nodes.filter((n) => n.fields.layout === "post");
  posts.forEach((post, index) => {
    const next = index === posts.length - 1 ? null : posts[index + 1];
    const prev = index === 0 ? null : posts[index - 1];

    createPage({
      path: `${post.fields.link}`,
      component: path.resolve(`src/templates/page.tsx`),
      context: {
        link: `${post.fields.link}`,
        prev,
        next,
        layout: post.fields.layout
      }
    });
  });
  // 文章列表
  createPagination(posts.length, "/", path.resolve("src/templates/list.tsx"));

  // 分类
  const categories = data.categories.group;
  categories.forEach((c) => {
    createPagination(
      c.totalCount,
      category(c.fieldValue),
      path.resolve(`src/templates/category.tsx`),
      {
        category: c.fieldValue,
        totalCount: c.totalCount
      }
    );
  });
  // 标签
  const tags = data.tags.group;
  tags.forEach((t) => {
    createPagination(
      t.totalCount,
      tag(t.fieldValue),
      path.resolve(`src/templates/tag.tsx`),
      {
        tag: t.fieldValue,
        totalCount: t.totalCount
      }
    );
  });
  // 归档
  const archives = data.archives.group;
  archives.forEach((a) => {
    createPagination(
      a.totalCount,
      archive(a.fieldValue),
      path.resolve(`src/templates/archive.tsx`),
      {
        archive: a.fieldValue,
        totalCount: a.totalCount
      }
    );
  });
  // 所有归档
  createPagination(
    posts.length,
    `timeline`,
    path.resolve(`src/templates/archive.tsx`),
    {
      totalCount: posts.length
    }
  );

  return undefined;
};

export const sourceNodes = ({
  actions
}: SourceNodesArgs): GatsbyNode["sourceNodes"] => {
  const { createTypes } = actions;
  const schema = fs
    .readFileSync(`${__dirname}/../schema.graphql`)
    .toString("utf-8");
  createTypes(schema);

  return undefined;
};
