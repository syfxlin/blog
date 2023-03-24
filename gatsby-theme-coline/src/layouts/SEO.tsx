import React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { useSeoData } from "../queries/seo";
import { useAuthorData } from "../queries/author";

export type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

const format = (value: string, vars: Record<string, any>) => {
  return value.replace(
    /\{(\w+)}/g,
    (match, name) => vars[name] ?? `{${match}}`
  );
};

export const SEO: React.FC<SEOProps> = (props) => {
  const seo = useSeoData();
  const author = useAuthorData();
  return (
    <GatsbySeo
      language={seo.language}
      title={format(props.title || "{title}", seo)}
      description={format(props.description || "{description}", seo)}
      openGraph={{
        site_name: seo.title,
        type: "website",
        locale: seo.language,
        url: format(props.url || "{url}", seo),
        title: format(props.title || "{title}", seo),
        description: format(props.description || "{description}", seo),
        article: {
          authors: [`${author.firstName} ${author.lastName}`],
        },
        images: [
          // prettier-ignore
          {
            url: format(props.image || seo.logo?.images?.fallback?.src || "", seo),
            alt: format(props.title || "{title}", seo),
          },
        ],
      }}
      twitter={{
        handle: seo.twitter,
        site: seo.twitter,
        cardType: "summary_large_image",
      }}
      metaTags={seo.metaTags}
      linkTags={seo.linkTags}
    />
  );
};
