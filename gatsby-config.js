const { generateConfig } = require("gatsby-plugin-ts-config");
require("dotenv").config({
  path: `.env`
});

module.exports = generateConfig({
  configDir: `${__dirname}/conf`
});
