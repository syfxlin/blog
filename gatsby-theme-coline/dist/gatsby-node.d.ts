import { GatsbyNode } from 'gatsby';

declare const onCreateNode: GatsbyNode["onCreateNode"];
declare const createPages: GatsbyNode["createPages"];

export { createPages, onCreateNode };
