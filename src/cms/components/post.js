export const postEditor = {
  id: "post",
  label: "Post Card",
  fields: [
    {
      name: "link",
      label: "链接",
      widget: "string"
    }
  ],
  pattern: /<post\s+link={?"(.*?)"}?\s*\/>/s,
  fromBlock: (match) => ({
    link: match[1]
  }),
  toBlock: (data) => `<post link="${data.link}" />`,
  toPreview: (data) => `<post link="${data.link}" />`
};
