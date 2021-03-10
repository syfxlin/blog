import React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { GatsbySeoProps } from "gatsby-plugin-next-seo/src/types";
import { graphql, useStaticQuery } from "gatsby";

export type HeadProps = {
  url?: string;
} & GatsbySeoProps;

const Head: React.FC<HeadProps> = ({ title, description, url, ...props }) => {
  const { site } = useStaticQuery<{
    site: { siteMetadata: { siteUrl: string } };
  }>(graphql`
    query HeadUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  return (
    <>
      <GatsbySeo
        {...props}
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: url ? `${site.siteMetadata.siteUrl}${url}` : undefined
        }}
      />
    </>
  );
};

export default Head;
