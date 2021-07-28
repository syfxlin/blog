import {
  buildNodeDefinitions,
  compileNodeQueries,
  createDefaultQueryExecutor,
  createSchemaCustomization as createToolkitSchemaCustomization,
  generateDefaultFragments,
  loadSchema,
  readOrGenerateDefaultFragments,
  sourceAllNodes,
  wrapQueryExecutorWithQueue,
  writeCompiledQueries
} from "@syfxlin/gatsby-graphql-source-toolkit";
import fs from "fs";
import { GraphQLField, GraphQLObjectType } from "graphql";
import {
  Actions,
  CreateResolversArgs,
  CreateSchemaCustomizationArgs,
  GatsbyNode,
  Node,
  NodeInput,
  PluginOptions,
  SourceNodesArgs
} from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { IDefaultFragmentsConfig } from "@syfxlin/gatsby-graphql-source-toolkit/dist/compile-node-queries/generate-default-fragments";
import { IGatsbyNodeConfig } from "@syfxlin/gatsby-graphql-source-toolkit/dist/types";

type Options = PluginOptions & {
  concurrency: number;
  typePrefix: string;
  endpoints: {
    graphql: string;
    system: string;
    base: string;
  };
  headers: Record<string, string>;
};

const normalizeEndpoint = (endpoint: string) => {
  const url = new URL(endpoint);
  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  const prefix = url.pathname == "/" ? "" : ".";

  const graphql = new URL(`${prefix}/graphql`, url.toString());
  graphql.hash = url.hash;
  graphql.search = url.search;

  const system = new URL(`${prefix}/graphql/system`, url.toString());
  system.hash = url.hash;
  system.search = url.search;

  const base = new URL(`${prefix}/`, url.toString());
  base.hash = url.hash;
  base.search = url.search;

  return {
    graphql: graphql.toString(),
    system: system.toString(),
    base: base.toString()
  };
};

const defaultOptions = (options: PluginOptions | undefined): Options => {
  if (!options) {
    options = { plugins: [] };
  }
  if (!options.url) {
    throw new Error("Url must be set");
  } else {
    options.endpoints = normalizeEndpoint(options.url as string);
  }
  if (!options.typePrefix) {
    options.typePrefix = "Directus_";
  }
  if (!options.concurrency) {
    options.concurrency = 10;
  }
  options.headers = {
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
  };
  return options as any;
};

const filterNode = (type: GraphQLField<any, any>): boolean => {
  if (
    type.name.endsWith("_by_id") ||
    type.name.endsWith("_by_name") ||
    type.name.endsWith("_in_collection")
  ) {
    return false;
  }
  return ![
    "server_health",
    "server_ping",
    "server_specs_graphql",
    "server_specs_oas"
  ].includes(type.name);
};

const createSourcingConfig = async (
  gatsbyApi: SourceNodesArgs,
  { url, graphPath, typePrefix, concurrency, headers }: Options
) => {
  const execute = createDefaultQueryExecutor(url as string, {
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
  const schema = await loadSchema(execute);
  const possibleTypes = (
    schema.getQueryType() as GraphQLObjectType
  ).getFields();
  const gatsbyNodeTypes: IGatsbyNodeConfig[] = Object.values(possibleTypes)
    .filter((type) => filterNode(type as GraphQLField<any, any>))
    .map((type) => {
      const hasLimit = type.args.find((arg) => arg.name === "limit");
      const hasOffset = type.args.find((arg) => arg.name === "offset");
      const hasFilter = type.args.find((arg) => arg.name === "filter");
      let queryVariables;
      let nodeQueryArgs;
      let listQueryArgs;
      if (hasFilter) {
        queryVariables = {
          nodeQueryVariables: ({ id }: any) => ({
            filter: { id }
          })
        };
        nodeQueryArgs = "(filter: $filter)";
      } else {
        queryVariables = {};
        nodeQueryArgs = "";
      }
      if (hasLimit && hasOffset) {
        listQueryArgs = "(limit: $limit, offset: $offset)";
      } else if (hasLimit) {
        listQueryArgs = "(limit: $limit)";
      } else if (hasOffset) {
        listQueryArgs = "(offset: $offset)";
      } else {
        listQueryArgs = "";
      }
      return {
        remoteTypeName: type.name,
        queries: `
          query LIST_${type.name.toUpperCase()} {
            ${type.name}${listQueryArgs} {
              ..._${type.name}Id_
            }
          }
          query NODE_${type.name.toUpperCase()}{
            ${type.name}${nodeQueryArgs} {
            ..._${type.name}Id_
            }
          }
          fragment _${type.name}Id_ on ${type.name} {
            __typename
            id
          }`,
        ...queryVariables
      };
    });

  const config: IDefaultFragmentsConfig = {
    schema,
    gatsbyNodeTypes
  };
  let fragments;
  if (graphPath) {
    const fragmentsDir = `${process.cwd()}/${graphPath}`;
    if (!fs.existsSync(fragmentsDir)) fs.mkdirSync(fragmentsDir);
    fragments = await readOrGenerateDefaultFragments(
      graphPath as string,
      config
    );
  } else {
    fragments = await generateDefaultFragments(config);
  }

  const documents = compileNodeQueries({
    schema,
    gatsbyNodeTypes,
    customFragments: fragments
  });

  if (graphPath) {
    await writeCompiledQueries(
      `${process.cwd()}/${graphPath}/queries`,
      documents
    );
  }

  return {
    gatsbyApi,
    schema,
    execute: wrapQueryExecutorWithQueue(execute, { concurrency }),
    gatsbyTypePrefix: typePrefix,
    gatsbyNodeDefs: buildNodeDefinitions({ gatsbyNodeTypes, documents })
  };
};

const sourceLocalNodes = async (
  gatsbyApi: SourceNodesArgs,
  options: Options
) => {
  const config = await createSourcingConfig(gatsbyApi, options);
  await createToolkitSchemaCustomization(config);
  await sourceAllNodes(config);
};

const createDateField = (
  node: Node,
  createNodeField: Actions["createNodeField"]
) => {
  const create = (field: string) => {
    // @ts-ignore
    const date = new Date(node[field] || node["date_created"]);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    createNodeField({ node, name: `${field}_year`, value: `${year}` });
    createNodeField({ node, name: `${field}_month`, value: `${month}` });
    const yearMonth = `${year}-${month}`;
    createNodeField({ node, name: `${field}_year_month`, value: yearMonth });
  };
  create("date_created");
  create("date_updated");
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi: SourceNodesArgs,
  pluginOptions: PluginOptions
) => {
  const options = defaultOptions(pluginOptions);
  await sourceLocalNodes(gatsbyApi, {
    ...options,
    url: options.endpoints.graphql
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = async (
  { node, actions, createNodeId, createContentDigest, store, cache, reporter },
  pluginOptions
) => {
  const { createNode, createNodeField } = actions;
  const options = defaultOptions(pluginOptions);
  if (node.internal.type === `${options.typePrefix}article`) {
    const markdownNode: NodeInput = {
      id: `MarkdownNode:${createNodeId(`${node.id}-content`)}`,
      parent: node.id,
      internal: {
        type: `${options.typePrefix}MarkdownNode`,
        mediaType: "text/markdown",
        content: (node.content as string) || "",
        contentDigest: createContentDigest((node.content as string) || "")
      }
    };
    createNode(markdownNode);
    // @ts-ignore
    node.markdownNode = markdownNode.id;

    // 日期时间，用于查询
    createDateField(node, createNodeField);
    createDateField(node, createNodeField);
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  async (
    { actions }: CreateSchemaCustomizationArgs,
    pluginOptions: PluginOptions
  ) => {
    const { createTypes } = actions;
    const { typePrefix } = defaultOptions(pluginOptions);
    createTypes(`
    type ${typePrefix}Fields {
      date_created_year: String
      date_created_month: String
      date_created_year_month: String
      date_updated_year: String
      date_updated_month: String
      date_updated_year_month: String
    }
    type ${typePrefix}MarkdownNode implements Node {
      id: ID!
    }
    type ${typePrefix}article implements Node {
      markdownNode: ${typePrefix}MarkdownNode @link
      fields: ${typePrefix}Fields
    }
  `);
  };

export const createResolvers: GatsbyNode["createResolvers"] = async (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter
  }: CreateResolversArgs,
  pluginOptions: PluginOptions
) => {
  const { createNode } = actions;
  const options = defaultOptions(pluginOptions);
  const resolvers: { [name: string]: any } = {};
  resolvers[`${options.typePrefix}directus_files`] = {
    localFile: {
      type: "File",
      async resolve(source: any) {
        if (!source || !source.id) {
          return null;
        }
        return await createRemoteFileNode({
          url: `${options.endpoints.base}assets/${source.id}`,
          store,
          cache,
          createNode,
          createNodeId,
          reporter
        });
      }
    }
  };
  await createResolvers(resolvers);
};
