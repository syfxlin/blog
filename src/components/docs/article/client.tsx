"use client";
import * as React from "react";
import { ScraperRequest, ScraperResponse } from "../../../adapters/scraper-adapter";
import { useAdapter } from "../../../adapters/use-adapter";
import { ArticleInner } from "./inner";

export const Article: React.FC<ScraperRequest> = React.memo((props) => {
  const query = useAdapter<ScraperRequest, ScraperResponse>("/api/scraper", props);
  return <ArticleInner {...query} />;
});
