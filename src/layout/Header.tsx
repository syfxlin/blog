import React from "react";
import { Link } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { useSeoData } from "../queries/seo";
import { GatsbyImage } from "gatsby-plugin-image";
import { useU } from "@syfxlin/ustyled";

export type HeaderProps = {
  title?: string;
  titleTemplate?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { css } = useU();
  const seo = useSeoData();
  return (
    <>
      <GatsbySeo
        language={seo.language}
        title={props.title || seo.title}
        description={props.description || seo.description}
        titleTemplate={props.titleTemplate || "%s"}
        openGraph={{
          site_name: seo.title,
          url: props.url ? `${seo.url}${props.url}` : seo.url,
          type: "website",
          locale: seo.language,
          title: props.title || seo.title,
          description: props.description || seo.description,
          images: [
            {
              url: props.image || seo.logo.images.fallback?.src || "",
              alt: props.title || seo.title,
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
      <header>
        <Link
          to={"/"}
          css={css`
            display: block;
            width: .fs(2.5);
            height: .fs(2.5);
            margin: .fs(1.5);
          `}
        >
          <GatsbyImage alt={"Site logo"} image={seo.logo} />
        </Link>
      </header>
    </>
  );
};
