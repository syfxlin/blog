const { useGatsbyNode } = require("gatsby-plugin-ts-config");

require("dotenv").config({
  path: `.env`
});

module.exports = useGatsbyNode(() => require("./config/gatsby-node"), {});
