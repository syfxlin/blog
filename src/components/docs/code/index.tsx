import * as React from "react";
import { bundledLanguages, bundledThemes, getHighlighter } from "shikiji";
import styles from "./styles.module.css";

const highlighter = getHighlighter({
  themes: Object.values(bundledThemes),
  langs: Object.values(bundledLanguages),
});

async function parse(theme: "light" | "dark", code: string, lang?: string) {
  const instance = await highlighter;
  return instance.codeToHtml(code, {
    lang: lang ?? "markdown",
    theme: theme === "light" ? "vitesse-light" : "vitesse-dark",
  });
}

export interface CodeProps {
  language?: string;
  children: string;
}

export const Code: React.FC<CodeProps> = async ({ language, children }) => {
  const html = await parse("light", children, language) + await parse("dark", children, language);
  return (
    <div
      className={styles.container}
      data-language={language?.toUpperCase()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
