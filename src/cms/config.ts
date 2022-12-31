import { CmsConfig } from "netlify-cms-core";

const layouts = {
  post: "文章",
  page: "页面",
  links: "友链",
};

const status = {
  draft: "草稿",
  publish: "发布",
  archive: "归档",
};

export const config: CmsConfig = {
  // base
  locale: "zh_Hans",
  display_url: "https://blog.ixk.me",
  publish_mode: "editorial_workflow",
  // storage
  local_backend: true,
  backend: {
    name: "github",
    repo: "syfxlin/blog",
    branch: "master",
    base_url: "https://netlify-cms-oauth-syfxlin.vercel.app/",
  },
  // images
  media_folder: "static/img",
  public_folder: "/img",
  collections: [
    {
      name: "post",
      label: "文章",
      folder: "content/posts",
      create: true,
      slug: "index",
      summary: "{{title}} [{{status}}]",
      media_folder: "",
      public_folder: "",
      path: "{{fields.slug}}/index",
      preview_path: "/post/{{fields.slug}}",
      sortable_fields: ["title", "date", "date_updated"],
      view_filters: [
        ...Object.entries(status).map(([k, v]) => ({
          label: `状态 - ${v}`,
          field: "status",
          pattern: k,
        })),
        ...[0, 1, 2, 3, 4]
          .map((i) => new Date().getFullYear() - i)
          .map((i) => ({
            label: `年份 - ${i}`,
            field: "date",
            pattern: `${i}`,
          })),
      ],
      view_groups: [
        {
          label: "状态",
          field: "status",
        },
        {
          label: "发布时间",
          field: "date",
          pattern: "\\d{4}-\\d{2}",
        },
      ],
      fields: [
        {
          name: "title",
          label: "标题",
          widget: "string",
        },
        {
          name: "slug",
          label: "链接",
          widget: "string",
        },
        {
          name: "status",
          label: "状态",
          widget: "select",
          default: "draft",
          options: Object.entries(status).map(([k, v]) => ({
            label: v,
            value: k,
          })),
        },
        {
          name: "layout",
          label: "布局",
          widget: "hidden",
          default: "post",
        },
        {
          name: "date",
          label: "发布时间",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          time_format: "hh:mm:ss",
        },
        {
          name: "date_updated",
          label: "修改时间",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          time_format: "hh:mm:ss",
        },
        {
          name: "thumbnail",
          label: "缩略图",
          widget: "image",
          required: false,
        },
        {
          name: "categories",
          label: "分类",
          widget: "list",
          default: ["折腾记录"],
        },
        {
          name: "tags",
          label: "标签",
          widget: "list",
          required: false,
        },
        {
          name: "body",
          label: "内容",
          widget: "markdown",
        },
      ],
    },
    {
      name: "page",
      label: "页面",
      folder: "content/pages",
      create: true,
      slug: "index",
      summary: "{{title}} [{{status}}]",
      media_folder: "",
      public_folder: "",
      path: "{{fields.slug}}/index",
      preview_path: "/{{fields.slug}}",
      sortable_fields: ["title", "date", "date_updated"],
      view_filters: [
        ...Object.entries(layouts).map(([k, v]) => ({
          label: `布局 - ${v}`,
          field: "layout",
          pattern: k,
        })),
        ...Object.entries(status).map(([k, v]) => ({
          label: `状态 - ${v}`,
          field: "status",
          pattern: k,
        })),
        ...[0, 1, 2, 3, 4]
          .map((i) => new Date().getFullYear() - i)
          .map((i) => ({
            label: `年份 - ${i}`,
            field: "date",
            pattern: `${i}`,
          })),
      ],
      view_groups: [
        {
          label: "布局",
          field: "layout",
        },
        {
          label: "状态",
          field: "status",
        },
        {
          label: "发布时间",
          field: "date",
          pattern: "\\d{4}-\\d{2}",
        },
      ],
      fields: [
        {
          name: "title",
          label: "标题",
          widget: "string",
        },
        {
          name: "slug",
          label: "链接",
          widget: "string",
        },
        {
          name: "status",
          label: "状态",
          widget: "select",
          default: "draft",
          options: Object.entries(status).map(([k, v]) => ({
            label: v,
            value: k,
          })),
        },
        {
          name: "layout",
          label: "布局",
          widget: "select",
          default: "page",
          options: Object.entries(layouts).map(([k, v]) => ({
            label: v,
            value: k,
          })),
        },
        {
          name: "date",
          label: "发布时间",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          time_format: "hh:mm:ss",
        },
        {
          name: "date_updated",
          label: "修改时间",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          time_format: "hh:mm:ss",
        },
        {
          name: "thumbnail",
          label: "缩略图",
          widget: "image",
          required: false,
        },
        {
          name: "body",
          label: "内容",
          widget: "markdown",
        },
      ],
    },
    {
      name: "settings",
      label: "设置",
      media_folder: "img",
      public_folder: "img",
      files: [
        {
          file: "content/settings/author.json",
          name: "author",
          label: "作者",
          fields: [
            {
              name: "firstName",
              label: "名",
              widget: "string",
            },
            {
              name: "lastName",
              label: "姓",
              widget: "string",
            },
            {
              name: "avatar",
              label: "头像",
              widget: "image",
            },
            {
              name: "description",
              label: "描述",
              widget: "text",
            },
          ],
        },
        {
          file: "content/settings/seo.json",
          name: "seo",
          label: "SEO",
          fields: [
            {
              name: "language",
              label: "语言",
              widget: "string",
            },
            {
              name: "url",
              label: "站点地址",
              widget: "string",
            },
            {
              name: "title",
              label: "站点名称",
              widget: "string",
            },
            {
              name: "description",
              label: "站点描述",
              widget: "text",
            },
            {
              name: "logo",
              label: "站点图片",
              widget: "image",
            },
            {
              name: "twitter",
              label: "Twitter",
              widget: "string",
            },
            {
              name: "meta_tags",
              label: "Meta 标签",
              widget: "code",
              default_language: "json",
            },
            {
              name: "link_tags",
              label: "Link 标签",
              widget: "code",
              default_language: "json",
            },
          ],
        },
        {
          file: "content/settings/nav.json",
          name: "nav",
          label: "菜单",
          fields: [
            {
              name: "main",
              label: "主菜单",
              widget: "list",
              fields: [
                {
                  name: "title",
                  label: "标题",
                  widget: "string",
                  required: true,
                },
                {
                  name: "url",
                  label: "链接",
                  widget: "string",
                  required: true,
                },
                {
                  name: "icon",
                  label: "图标",
                  widget: "string",
                  required: true,
                },
                {
                  name: "view",
                  label: "显示模式",
                  widget: "select",
                  default: "elastic",
                  required: true,
                  options: [
                    { value: "always", label: "总是显示描述" },
                    { value: "elastic", label: "弹性显示描述" },
                    { value: "always-icon", label: "总是显示图标" },
                    { value: "elastic-icon", label: "弹性显示图标" },
                  ],
                },
              ],
            },
          ],
        },
        {
          file: "content/settings/footer.json",
          name: "footer",
          label: "页脚",
          fields: [
            {
              name: "main",
              label: "主页脚",
              widget: "code",
              default_language: "html",
            },
          ],
        },
        {
          file: "content/settings/license.json",
          name: "license",
          label: "版权声明",
          fields: [
            {
              name: "label",
              label: "协议名称",
              widget: "string",
            },
            {
              name: "href",
              label: "协议链接",
              widget: "string",
            },
          ],
        },
        {
          file: "content/settings/links.json",
          name: "links",
          label: "友链",
          fields: [
            {
              name: "links",
              label: "友链",
              widget: "list",
              fields: [
                {
                  name: "name",
                  label: "站点名称",
                  widget: "string",
                },
                {
                  name: "author",
                  label: "作者",
                  widget: "string",
                  required: false,
                },
                {
                  name: "url",
                  label: "站点链接",
                  widget: "string",
                },
                {
                  name: "avatar",
                  label: "头像",
                  widget: "image",
                },
                {
                  name: "bio",
                  label: "简介",
                  widget: "string",
                  required: false,
                },
              ],
            },
            {
              name: "lostConnection",
              label: "已失联的友链",
              widget: "list",
              fields: [
                {
                  name: "name",
                  label: "站点名称",
                  widget: "string",
                },
                {
                  name: "url",
                  label: "站点链接",
                  widget: "string",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
