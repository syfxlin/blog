export const repoEditor = {
  id: "repo",
  label: "Repo Card",
  fields: [
    {
      name: "name",
      label: "用户名",
      widget: "string"
    },
    {
      name: "repo",
      label: "仓库名",
      widget: "string"
    }
  ],
  pattern: /<repo\s+name={?"(\S+)"}?\s+repo={?"(\S+)"}?\s*\/>/s,
  fromBlock: (match) => ({
    name: match[1],
    repo: match[2]
  }),
  toBlock: (data) => `<repo name="${data.name}" repo="${data.repo}" />`,
  toPreview: (data) => `<repo name="${data.name}" repo="${data.repo}" />`
};
