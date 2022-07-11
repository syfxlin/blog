import { CmsConfig } from "netlify-cms-core";

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
      media_folder: "",
      public_folder: "",
      path: "{{slug}}/index",
      preview_path: "/post/{{fields.slug}}",
      sortable_fields: ["title", "date", "date_updated"],
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
          options: [
            {
              value: "draft",
              label: "草稿",
            },
            {
              value: "publish",
              label: "发布",
            },
            {
              value: "archive",
              label: "归档",
            },
          ],
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
        },
        {
          name: "date_updated",
          label: "修改时间",
          widget: "datetime",
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
      media_folder: "",
      public_folder: "",
      path: "{{title}}/index",
      preview_path: "/{{fields.slug}}",
      sortable_fields: ["title", "date", "date_updated"],
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
          options: [
            {
              value: "draft",
              label: "草稿",
            },
            {
              value: "publish",
              label: "发布",
            },
            {
              value: "archive",
              label: "归档",
            },
          ],
        },
        {
          name: "layout",
          label: "布局",
          widget: "select",
          default: "page",
          options: [
            {
              value: "page",
              label: "页面",
            },
            {
              value: "links",
              label: "友链",
            },
          ],
        },
        {
          name: "date",
          label: "发布时间",
          widget: "datetime",
        },
        {
          name: "date_updated",
          label: "修改时间",
          widget: "datetime",
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
