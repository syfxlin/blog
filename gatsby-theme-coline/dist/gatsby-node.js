"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/gatsby-node.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// src/utils/urls.ts
var layout = (layout2, ...paths) => {
  if (layout2 === "page") {
    layout2 = "";
  }
  return join("/", layout2, ...paths);
};
var join = (...paths) => {
  const join2 = paths.map((path2) => String(path2).replace(/^\/|\/$/g, "")).filter((path2) => path2).join("/");
  return ("/" + join2).toLowerCase();
};

// src/queries/init/status.ts
var status = process.env.NODE_ENV === "development" ? ["publish", "draft", "archive"] : ["publish"];

// src/queries/init/articles.ts
var query = `
  query InitArticlesQuery($status: [String!]!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { status: { in: $status } } }
    ) {
      nodes {
        frontmatter {
          layout
          title
        }
        fields {
          slug
        }
        parent {
          ... on File {
            absolutePath
          }
        }
      }
    }
  }
`;
var convert = (data) => {
  return data.allMdx.nodes.map((item) => ({
    link: _optionalChain([item, 'access', _ => _.fields, 'optionalAccess', _2 => _2.slug]),
    layout: _optionalChain([item, 'access', _3 => _3.frontmatter, 'optionalAccess', _4 => _4.layout]),
    title: _optionalChain([item, 'access', _5 => _5.frontmatter, 'optionalAccess', _6 => _6.title]),
    // @ts-ignore
    contentPath: _optionalChain([item, 'access', _7 => _7.parent, 'optionalAccess', _8 => _8.absolutePath])
  }));
};

// src/queries/init/groups.ts
var convert2 = (data) => {
  return data.allMdx.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
var archives = `
  query InitArchivesQuery($status: [String!]!) {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: fields___date_year) {
        fieldValue
        totalCount
      }
    }
  }
`;
var categories = `
  query InitCategoriesQuery($status: [String!]!) {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
var tags = `
  query TagsQuery($status: [String!]!) {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

// src/gatsby-node.ts
var onCreateNode = (args) => {
  if (args.node.internal.type === "Mdx") {
    const node = args.node;
    const actions = args.actions;
    const frontmatter = node.frontmatter;
    if (!frontmatter || !frontmatter.slug || !frontmatter.layout || !frontmatter.date) {
      return;
    }
    const slug = layout(
      frontmatter.layout === "post" /* POST */ ? "post" /* POST */ : "page" /* PAGE */,
      frontmatter.slug
    );
    actions.createNodeField({
      node: args.node,
      name: "slug",
      value: slug
    });
    const date = new Date(frontmatter.date);
    actions.createNodeField({
      node: args.node,
      name: "date_year",
      value: date.getFullYear()
    });
    actions.createNodeField({
      node: args.node,
      name: "date_month",
      value: date.getMonth()
    });
    actions.createNodeField({
      node: args.node,
      name: "date_day",
      value: date.getDay()
    });
  }
};
var createPages = async (args) => {
  const { graphql, actions } = args;
  const createPageable = (size, path2, component, context) => {
    const perPage = 10;
    const pageSize = Math.ceil(size / perPage);
    actions.createPage({
      path: join(path2),
      component,
      context: {
        limit: perPage,
        skip: 0,
        current: 1,
        size: pageSize,
        ...context
      }
    });
    for (let i = 0; i < pageSize; i++) {
      actions.createPage({
        path: join(path2, "page", i + 1),
        component,
        context: {
          limit: perPage,
          skip: i * perPage,
          current: i + 1,
          size: pageSize,
          ...context
        }
      });
    }
  };
  const articles = convert(
    (await graphql(query, { status })).data
  );
  const archives2 = convert2(
    (await graphql(archives, { status })).data
  );
  const categories2 = convert2(
    (await graphql(categories, { status })).data
  );
  const tags2 = convert2(
    (await graphql(tags, { status })).data
  );
  const pages = articles.filter((i) => i.layout !== "post" /* POST */);
  const posts = articles.filter((i) => i.layout === "post" /* POST */);
  createPageable(
    posts.length,
    "/",
    _path2.default.join(__dirname, "../src/templates/article.tsx"),
    {
      status
    }
  );
  for (const archive of archives2) {
    createPageable(
      archive.count,
      layout("archive" /* ARCHIVE */, archive.name),
      _path2.default.join(__dirname, "../src/templates/archive.tsx"),
      {
        archive: parseInt(archive.name),
        total: archive.count,
        status
      }
    );
  }
  for (const category of categories2) {
    createPageable(
      category.count,
      layout("category" /* CATEGORY */, category.name),
      _path2.default.join(__dirname, "../src/templates/category.tsx"),
      {
        category: category.name,
        total: category.count,
        status
      }
    );
  }
  for (const tag of tags2) {
    createPageable(
      tag.count,
      layout("tag" /* TAG */, tag.name),
      _path2.default.join(__dirname, "../src/templates/tag.tsx"),
      {
        tag: tag.name,
        total: tag.count,
        status
      }
    );
  }
  actions.createPage({
    path: `/archives`,
    component: _path2.default.join(__dirname, `../src/templates/archives.tsx`),
    context: {
      status
    }
  });
  for (const page of pages) {
    actions.createPage({
      path: join(page.link),
      // prettier-ignore
      component: `${_path2.default.join(__dirname, `../src/templates/${page.layout}.tsx`)}?__contentFilePath=${page.contentPath}`,
      context: {
        link: page.link,
        layout: page.layout,
        status
      }
    });
  }
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const prev = i === 0 ? null : posts[i - 1];
    const next = i === posts.length - 1 ? null : posts[i + 1];
    actions.createPage({
      path: join(post.link),
      // prettier-ignore
      component: `${_path2.default.join(__dirname, `../src/templates/page.tsx`)}?__contentFilePath=${post.contentPath}`,
      context: {
        link: post.link,
        layout: post.layout,
        prev,
        next,
        status
      }
    });
  }
};



exports.createPages = createPages; exports.onCreateNode = onCreateNode;
