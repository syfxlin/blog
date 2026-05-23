import * as React from "react";
import { bundledLanguages, bundledThemes, getHighlighter } from "shikiji";

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
  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- Shikiji generates the highlighted markup.
  return <div className="[&_.shiki_code]:font-inherit relative my-4 bg-background-card p-0 text-[0.9rem] leading-none font-normal tracking-[0em] before:absolute before:top-0 before:right-0 before:z-[1] before:px-[0.9rem] before:py-[0.9rem] before:text-base before:text-text-primary before:opacity-100 before:transition-[opacity,color,background-color] before:duration-300 before:content-[attr(data-language)] hover:before:opacity-0 [&_.shiki]:m-0 [&_.shiki]:max-h-[50em] [&_.shiki]:overflow-auto [&_.shiki]:bg-transparent [&_.shiki]:px-[1.2rem] [&_.shiki]:py-4 [&_.shiki]:font-mono [&_.shiki]:leading-normal [&_.shiki_code]:rounded-none [&_.shiki_code]:bg-transparent [&_.shiki_code]:p-0 [&_.shiki_code]:break-normal [&_.shiki_code]:text-[unset] [&_.shiki_code]:text-[unset] [&_.shiki.vitesse-dark]:hidden [&_.shiki.vitesse-light]:hidden" data-language={language?.toUpperCase()} dangerouslySetInnerHTML={{ __html: html }} />;
};
