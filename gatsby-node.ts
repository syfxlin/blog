import { GatsbyNode } from "gatsby";
import { join, layout } from "./src/utils/urls";
import * as articlesQuery from "./src/queries/init/articles";
import { status } from "./src/queries/init/status";
import path from "path";

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  if (args.node.internal.type === "Mdx") {
    const node = args.node as unknown as Queries.Mdx;
    const actions = args.actions;
    const frontmatter = node.frontmatter;

    if (
      !frontmatter ||
      !frontmatter.slug ||
      !frontmatter.layout ||
      !frontmatter.date
    ) {
      return;
    }

    // 固定链接
    const slug = layout(
      frontmatter.slug,
      frontmatter.layout === "post" ? "post" : "page"
    );
    actions.createNodeField({
      node: args.node,
      name: "slug",
      value: slug,
    });

    // 部分日期
    const date = new Date(frontmatter.date);
    actions.createNodeField({
      node: args.node,
      name: "date_year",
      value: date.getFullYear(),
    });
    actions.createNodeField({
      node: args.node,
      name: "date_month",
      value: date.getMonth(),
    });
    actions.createNodeField({
      node: args.node,
      name: "date_day",
      value: date.getDay(),
    });
  }
};

export const createPages: GatsbyNode["createPages"] = async (args) => {
  const { graphql, actions } = args;

  // 创建分页
  const createPageable = (
    size: number,
    path: string,
    component: string,
    context?: Record<string, any>
  ) => {
    const perPage = 10;
    const pageSize = Math.ceil(size / perPage);
    actions.createPage({
      path: join(path),
      component,
      context: {
        limit: perPage,
        skip: 0,
        current: 1,
        size: pageSize,
        ...context,
      },
    });
    for (let i = 0; i < pageSize; i++) {
      actions.createPage({
        path: join(path, "page", i + 1),
        component,
        context: {
          limit: perPage,
          skip: i * perPage,
          current: i + 1,
          size: pageSize,
          ...context,
        },
      });
    }
  };

  // 查询
  const articles = articlesQuery.convert(
    (await graphql(articlesQuery.query, { status })).data as any
  );

  const pages = articles.filter((i) => i.layout !== "post");
  const posts = articles.filter((i) => i.layout === "post");

  // 文章列表
  createPageable(
    posts.length,
    "/",
    path.resolve("src/templates/articles.tsx"),
    { status }
  );
};
