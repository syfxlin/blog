import path from "path";
import { CreatePagesArgs, CreateResolversArgs, GatsbyNode } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { archive, category, join, tag } from "../src/utils/url";
import * as articlesQuery from "./query/articles";
import * as archivesQuery from "./query/archives";
import * as categoriesQuery from "./query/categories";
import * as tagsQuery from "./query/tags";
import { status } from "./query/filter";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions
}: CreatePagesArgs) => {
  const { createPage } = actions;

  // 创建分页
  const createPagination = (
    size: number,
    path: string,
    component: string,
    context?: Record<string, any>
  ) => {
    const perPage = 10;
    const pageSize = Math.ceil(size / perPage);
    createPage({
      path: join(path),
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

  // 查询数据
  const articles = articlesQuery.convert(
    (await graphql(articlesQuery.query, { status })).data as any
  );
  const categories = categoriesQuery.convert(
    (await graphql(categoriesQuery.query, { status })).data as any
  );
  const tags = tagsQuery.convert(
    (await graphql(tagsQuery.query, { status })).data as any
  );
  const archives = archivesQuery.convert(
    (await graphql(archivesQuery.query, { status })).data as any
  );

  // 文章或其他类型的页面，通过 layout 区分
  // 页面
  const pages = articles.filter((n) => n.layout !== "post");
  pages.forEach((page) => {
    createPage({
      path: join(page.link),
      component: path.resolve(`src/templates/${page.layout}.tsx`),
      context: {
        link: `${page.link}`,
        layout: page.layout,
        status
      }
    });
  });
  // 文章
  const posts = articles.filter((n) => n.layout === "post");
  posts.forEach((post, index) => {
    const next = index === posts.length - 1 ? null : posts[index + 1];
    const prev = index === 0 ? null : posts[index - 1];
    createPage({
      path: join(post.link),
      component: path.resolve(`src/templates/page.tsx`),
      context: {
        link: join(post.link),
        prev,
        next,
        layout: post.layout,
        status
      }
    });
  });

  // 文章列表
  createPagination(posts.length, "/", path.resolve("src/templates/list.tsx"), {
    status
  });

  // 分类
  categories.forEach((c) => {
    createPagination(
      c.count,
      category(c.name),
      path.resolve(`src/templates/category.tsx`),
      {
        category: c.name,
        totalCount: c.count,
        status
      }
    );
  });
  // 标签
  tags.forEach((t) => {
    createPagination(
      t.count,
      tag(t.name),
      path.resolve(`src/templates/tag.tsx`),
      {
        tag: t.name,
        totalCount: t.count,
        status
      }
    );
  });
  // 归档
  archives.forEach((a) => {
    createPagination(
      a.count,
      archive(a.name),
      path.resolve(`src/templates/archive.tsx`),
      {
        archive: a.name,
        totalCount: a.count,
        status
      }
    );
  });

  // 所有归档（时间轴）
  createPagination(
    posts.length,
    `timeline`,
    path.resolve(`src/templates/archive.tsx`),
    {
      totalCount: posts.length,
      status
    }
  );
  // 标签云
  createPage({
    path: join("tags"),
    component: path.resolve(`src/templates/tag-cloud.tsx`),
    context: {
      status
    }
  });
};

export const createResolvers: GatsbyNode["createResolvers"] = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}: CreateResolversArgs) => {
  const { createNode } = actions;
  // Directus System 远程图片
  await createResolvers({
    Directus_System_directus_files: {
      localFile: {
        type: "File",
        async resolve(source: any) {
          if (!source || !source.id) {
            return null;
          }
          return await createRemoteFileNode({
            url: `${process.env.DIRECTUS_URL}/assets/${source.id}`,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    }
  });
};
