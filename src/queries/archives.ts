import { Groups } from "./init/groups";

export type ArchivesPageData = {
  archives: Groups;
  categories: Groups;
  tags: Groups;
  articles: number;
  pages: number;
};

export const convert = (
  data: Queries.ArchivesPageQueryQuery
): ArchivesPageData => {
  return {
    archives:
      data.archives.group.map((group) => ({
        name: group.fieldValue as string,
        count: group.totalCount as number,
      })) ?? [],
    categories:
      data.categories.group.map((group) => ({
        name: group.fieldValue as string,
        count: group.totalCount as number,
      })) ?? [],
    tags:
      data.tags.group.map((group) => ({
        name: group.fieldValue as string,
        count: group.totalCount as number,
      })) ?? [],
    articles: data.articles.totalCount ?? 0,
    pages: data.pages.totalCount ?? 0,
  };
};
