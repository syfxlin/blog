const { useGatsbyConfig } = require("gatsby-plugin-ts-config");

require("dotenv").config({
  path: `.env`
});

module.exports = useGatsbyConfig(() => require("./config/gatsby-config"), {});
