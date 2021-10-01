export const messageEditor = {
  id: "message",
  label: "Message Box",
  fields: [
    {
      name: "content",
      label: "内容",
      widget: "markdown"
    }
  ],
  pattern: /^<message>$(.*?)^<\/message>$/ms,
  fromBlock: (match) => ({
    content: match[1]
  }),
  toBlock: (data) => `<message>${data.content}</message>`,
  toPreview: (data) => `<message>${data.content}</message>`
};
