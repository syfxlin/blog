import { DocumentElement } from "@keystatic/core";
import { DocumentRenderer, DocumentRendererProps } from "@keystatic/core/renderer";
// @ts-nocheck
import * as React from "react";
import { ReactNode } from "react";
import { Article } from "./article";
import { Articles } from "./articles";
import { Blockquote } from "./blockquote";
import { Code } from "./code";
import { Divider } from "./divider";
import { Github } from "./github";
import { Heading } from "./heading";
import { Image } from "./image";
import { InlineCode } from "./inline-code";
import { Katex } from "./katex";
import { Layout } from "./layout";
import { Link } from "./link";
import { List } from "./list";
import { Message } from "./message";
import { Paragraph } from "./paragraph";
import { Table } from "./table";

type RendererMap = NonNullable<DocumentRendererProps["renderers"]>;
type ComponentBlocks = NonNullable<DocumentRendererProps["componentBlocks"]>;

export const renderers = {
  inline: {
    link: Link,
    code: InlineCode,
  },
  block: {
    code: Code,
    list: List,
    image: Image,
    table: Table,
    layout: Layout,
    divider: Divider,
    heading: Heading,
    paragraph: Paragraph,
    blockquote: Blockquote,
  },
} as unknown as RendererMap;

export const components = {
  katex: Katex,
  github: Github,
  article: Article,
  message: Message,
  articles: Articles,
} as unknown as ComponentBlocks;

export interface RendererProps {
  document?: ReadonlyArray<DocumentElement>;
  position?: "none" | "top" | "bottom";
  children?: ReactNode;
}

export const Renderer: React.FC<RendererProps> = React.memo(({ document, position, children }) => {
  return (
    <section className="my-4">
      {position === "none" && children}
      {position === "bottom" && children}
      {position !== "none" && document && (
        <DocumentRenderer
          document={document as DocumentRendererProps["document"]}
          renderers={renderers}
          componentBlocks={components}
        />
      )}
      {position === "top" && children}
    </section>
  );
});
