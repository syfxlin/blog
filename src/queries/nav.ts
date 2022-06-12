import { graphql, useStaticQuery } from "gatsby";

export enum NavViewType {
  ALWAYS = "always",
  ELASTIC = "elastic",
  ALWAYS_ICON = "always-icon",
  ELASTIC_ICON = "elastic-icon",
}

export type NavData = {
  title: string;
  url: string;
  icon: string;
  view: NavViewType;
}[];

export const query = graphql`
  query NavQuery {
    navJson {
      main {
        title
        url
        icon
        view
      }
    }
  }
`;

export const convert = (data: Queries.NavQueryQuery): NavData => {
  // prettier-ignore
  const items = data.navJson?.main?.filter((i) => i?.title && i?.url && i?.icon && i?.view) ?? [];
  return items.map((i: any) => ({
    title: i.title,
    url: i.url,
    icon: i.icon,
    view: (i.view ?? "elastic") as NavViewType,
  }));
};

export const useNavData = () => convert(useStaticQuery(query));
