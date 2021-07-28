"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolvers = exports.createSchemaCustomization = exports.onCreateNode = exports.sourceNodes = void 0;
var gatsby_graphql_source_toolkit_1 = require("@syfxlin/gatsby-graphql-source-toolkit");
var fs_1 = __importDefault(require("fs"));
var gatsby_source_filesystem_1 = require("gatsby-source-filesystem");
var normalizeEndpoint = function (endpoint) {
    var url = new URL(endpoint);
    if (!url.pathname.endsWith("/")) {
        url.pathname = url.pathname + "/";
    }
    var prefix = url.pathname == "/" ? "" : ".";
    var graphql = new URL(prefix + "/graphql", url.toString());
    graphql.hash = url.hash;
    graphql.search = url.search;
    var system = new URL(prefix + "/graphql/system", url.toString());
    system.hash = url.hash;
    system.search = url.search;
    var base = new URL(prefix + "/", url.toString());
    base.hash = url.hash;
    base.search = url.search;
    return {
        graphql: graphql.toString(),
        system: system.toString(),
        base: base.toString()
    };
};
var defaultOptions = function (options) {
    if (!options) {
        options = { plugins: [] };
    }
    if (!options.url) {
        throw new Error("Url must be set");
    }
    else {
        options.endpoints = normalizeEndpoint(options.url);
    }
    if (!options.typePrefix) {
        options.typePrefix = "Directus_";
    }
    if (!options.concurrency) {
        options.concurrency = 10;
    }
    options.headers = __assign({}, (options.token ? { Authorization: "Bearer " + options.token } : {}));
    return options;
};
var filterNode = function (type) {
    if (type.name.endsWith("_by_id") ||
        type.name.endsWith("_by_name") ||
        type.name.endsWith("_in_collection")) {
        return false;
    }
    return ![
        "server_health",
        "server_ping",
        "server_specs_graphql",
        "server_specs_oas"
    ].includes(type.name);
};
var createSourcingConfig = function (gatsbyApi, _a) {
    var url = _a.url, graphPath = _a.graphPath, typePrefix = _a.typePrefix, concurrency = _a.concurrency, headers = _a.headers;
    return __awaiter(void 0, void 0, void 0, function () {
        var execute, schema, possibleTypes, gatsbyNodeTypes, config, fragments, fragmentsDir, documents;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    execute = gatsby_graphql_source_toolkit_1.createDefaultQueryExecutor(url, {
                        headers: __assign({ "Content-Type": "application/json" }, headers)
                    });
                    return [4 /*yield*/, gatsby_graphql_source_toolkit_1.loadSchema(execute)];
                case 1:
                    schema = _b.sent();
                    possibleTypes = schema.getQueryType().getFields();
                    gatsbyNodeTypes = Object.values(possibleTypes)
                        .filter(function (type) { return filterNode(type); })
                        .map(function (type) {
                        var hasLimit = type.args.find(function (arg) { return arg.name === "limit"; });
                        var hasOffset = type.args.find(function (arg) { return arg.name === "offset"; });
                        var hasFilter = type.args.find(function (arg) { return arg.name === "filter"; });
                        var queryVariables;
                        var nodeQueryArgs;
                        var listQueryArgs;
                        if (hasFilter) {
                            queryVariables = {
                                nodeQueryVariables: function (_a) {
                                    var id = _a.id;
                                    return ({
                                        filter: { id: id }
                                    });
                                }
                            };
                            nodeQueryArgs = "(filter: $filter)";
                        }
                        else {
                            queryVariables = {};
                            nodeQueryArgs = "";
                        }
                        if (hasLimit && hasOffset) {
                            listQueryArgs = "(limit: $limit, offset: $offset)";
                        }
                        else if (hasLimit) {
                            listQueryArgs = "(limit: $limit)";
                        }
                        else if (hasOffset) {
                            listQueryArgs = "(offset: $offset)";
                        }
                        else {
                            listQueryArgs = "";
                        }
                        return __assign({ remoteTypeName: type.name, queries: "\n          query LIST_" + type.name.toUpperCase() + " {\n            " + type.name + listQueryArgs + " {\n              ..._" + type.name + "Id_\n            }\n          }\n          query NODE_" + type.name.toUpperCase() + "{\n            " + type.name + nodeQueryArgs + " {\n            ..._" + type.name + "Id_\n            }\n          }\n          fragment _" + type.name + "Id_ on " + type.name + " {\n            __typename\n            id\n          }" }, queryVariables);
                    });
                    config = {
                        schema: schema,
                        gatsbyNodeTypes: gatsbyNodeTypes
                    };
                    if (!graphPath) return [3 /*break*/, 3];
                    fragmentsDir = process.cwd() + "/" + graphPath;
                    if (!fs_1.default.existsSync(fragmentsDir))
                        fs_1.default.mkdirSync(fragmentsDir);
                    return [4 /*yield*/, gatsby_graphql_source_toolkit_1.readOrGenerateDefaultFragments(graphPath, config)];
                case 2:
                    fragments = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, gatsby_graphql_source_toolkit_1.generateDefaultFragments(config)];
                case 4:
                    fragments = _b.sent();
                    _b.label = 5;
                case 5:
                    documents = gatsby_graphql_source_toolkit_1.compileNodeQueries({
                        schema: schema,
                        gatsbyNodeTypes: gatsbyNodeTypes,
                        customFragments: fragments
                    });
                    if (!graphPath) return [3 /*break*/, 7];
                    return [4 /*yield*/, gatsby_graphql_source_toolkit_1.writeCompiledQueries(process.cwd() + "/" + graphPath + "/queries", documents)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [2 /*return*/, {
                        gatsbyApi: gatsbyApi,
                        schema: schema,
                        execute: gatsby_graphql_source_toolkit_1.wrapQueryExecutorWithQueue(execute, { concurrency: concurrency }),
                        gatsbyTypePrefix: typePrefix,
                        gatsbyNodeDefs: gatsby_graphql_source_toolkit_1.buildNodeDefinitions({ gatsbyNodeTypes: gatsbyNodeTypes, documents: documents })
                    }];
            }
        });
    });
};
var sourceLocalNodes = function (gatsbyApi, options) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createSourcingConfig(gatsbyApi, options)];
            case 1:
                config = _a.sent();
                return [4 /*yield*/, gatsby_graphql_source_toolkit_1.createSchemaCustomization(config)];
            case 2:
                _a.sent();
                return [4 /*yield*/, gatsby_graphql_source_toolkit_1.sourceAllNodes(config)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createDateField = function (node, createNodeField) {
    var create = function (field) {
        // @ts-ignore
        var date = new Date(node[field] || node["date_created"]);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        createNodeField({ node: node, name: field + "_year", value: "" + year });
        createNodeField({ node: node, name: field + "_month", value: "" + month });
        var yearMonth = year + "-" + month;
        createNodeField({ node: node, name: field + "_year_month", value: yearMonth });
    };
    create("date_created");
    create("date_updated");
};
exports.sourceNodes = function (gatsbyApi, pluginOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = defaultOptions(pluginOptions);
                return [4 /*yield*/, sourceLocalNodes(gatsbyApi, __assign(__assign({}, options), { url: options.endpoints.graphql }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.onCreateNode = function (_a, pluginOptions) {
    var node = _a.node, actions = _a.actions, createNodeId = _a.createNodeId, createContentDigest = _a.createContentDigest, store = _a.store, cache = _a.cache, reporter = _a.reporter;
    return __awaiter(void 0, void 0, void 0, function () {
        var createNode, createNodeField, options, markdownNode;
        return __generator(this, function (_b) {
            createNode = actions.createNode, createNodeField = actions.createNodeField;
            options = defaultOptions(pluginOptions);
            if (node.internal.type === options.typePrefix + "article") {
                markdownNode = {
                    id: "MarkdownNode:" + createNodeId(node.id + "-content"),
                    parent: node.id,
                    internal: {
                        type: options.typePrefix + "MarkdownNode",
                        mediaType: "text/markdown",
                        content: node.content || "",
                        contentDigest: createContentDigest(node.content || "")
                    }
                };
                createNode(markdownNode);
                // @ts-ignore
                node.markdownNode = markdownNode.id;
                // 日期时间，用于查询
                createDateField(node, createNodeField);
                createDateField(node, createNodeField);
            }
            return [2 /*return*/];
        });
    });
};
exports.createSchemaCustomization = function (_a, pluginOptions) {
    var actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var createTypes, typePrefix;
        return __generator(this, function (_b) {
            createTypes = actions.createTypes;
            typePrefix = defaultOptions(pluginOptions).typePrefix;
            createTypes("\n    type " + typePrefix + "Fields {\n      date_created_year: String\n      date_created_month: String\n      date_created_year_month: String\n      date_updated_year: String\n      date_updated_month: String\n      date_updated_year_month: String\n    }\n    type " + typePrefix + "MarkdownNode implements Node {\n      id: ID!\n    }\n    type " + typePrefix + "article implements Node {\n      markdownNode: " + typePrefix + "MarkdownNode @link\n      fields: " + typePrefix + "Fields\n    }\n  ");
            return [2 /*return*/];
        });
    });
};
exports.createResolvers = function (_a, pluginOptions) {
    var actions = _a.actions, cache = _a.cache, createNodeId = _a.createNodeId, createResolvers = _a.createResolvers, store = _a.store, reporter = _a.reporter;
    return __awaiter(void 0, void 0, void 0, function () {
        var createNode, options, resolvers;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    createNode = actions.createNode;
                    options = defaultOptions(pluginOptions);
                    resolvers = {};
                    resolvers[options.typePrefix + "directus_files"] = {
                        localFile: {
                            type: "File",
                            resolve: function (source) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!source || !source.id) {
                                                    return [2 /*return*/, null];
                                                }
                                                return [4 /*yield*/, gatsby_source_filesystem_1.createRemoteFileNode({
                                                        url: options.endpoints.base + "assets/" + source.id,
                                                        store: store,
                                                        cache: cache,
                                                        createNode: createNode,
                                                        createNodeId: createNodeId,
                                                        reporter: reporter
                                                    })];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            }
                        }
                    };
                    return [4 /*yield*/, createResolvers(resolvers)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
