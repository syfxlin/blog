import React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { useSeoData } from "../query";

export type HeadProps = {
  url?: string;
  title?: string;
  titleTemplate?: string;
  description?: string;
};

const Head: React.FC<HeadProps> = ({
  title,
  description,
  url,
  titleTemplate
}) => {
  const seo = useSeoData();
  return (
    <>
      <GatsbySeo
        language={seo.language}
        title={title || seo.title}
        description={description || seo.description}
        titleTemplate={titleTemplate || `%s | ${seo.title}`}
        openGraph={{
          type: "website",
          locale: seo.language,
          site_name: seo.title,
          title: title || seo.title,
          description: description || seo.description,
          url: url ? `${seo.url}${url}` : undefined
        }}
        twitter={{
          handle: seo.twitter,
          site: seo.twitter,
          cardType: "summary_large_image"
        }}
        metaTags={seo.metaTags}
        linkTags={seo.linkTags}
      />
    </>
  );
};

export default Head;
