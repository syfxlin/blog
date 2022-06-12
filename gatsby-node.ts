import { GatsbyNode } from "gatsby";
import { layout } from "./src/utils/urls";
import Mdx = Queries.Mdx;

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  if (args.node.internal.type === "Mdx") {
    const node = args.node as unknown as Mdx;
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
