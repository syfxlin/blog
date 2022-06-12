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
      ],
    },
  ],
};
