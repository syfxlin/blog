import React, { ReactNode } from "react";
import { Link as GLink } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { useSeoData } from "../queries/seo";
import { GatsbyImage } from "gatsby-plugin-image";
import { useU, useUp } from "@syfxlin/ustyled";
import { Button, LinkButton } from "../components/Button";
import { NavViewType, useNavData } from "../queries/nav";
import { Icon } from "../components/Icon";
import { DarkMode } from "@icon-park/react";

export type HeaderProps = {
  title?: string;
  titleTemplate?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { css, setMode } = useU();
  const desktop = useUp("md");
  const seo = useSeoData();
  const nav = useNavData();

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
              url: props.image || seo.logo?.images?.fallback?.src || "",
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
      <header
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <GLink
          to="/"
          css={css`
            display: block;
            width: .fs(2.5);
            height: .fs(2.5);
            margin: .fs(1.5);
            border-radius: 50%;
            overflow: hidden;
            transition: filter 0.3s;

            .dark() {
              filter: brightness(0.7);
            }
          `}
        >
          {seo.logo && <GatsbyImage alt="站点图标" image={seo.logo} />}
        </GLink>
        <div
          css={css`
            display: flex;
            gap: .sp(1);
            padding-right: .fs(1.5);
          `}
        >
          {nav.map((item) => {
            let element: ReactNode = null;

            if (desktop) {
              if (item.view === NavViewType.ALWAYS) {
                element = item.title;
              }
              if (item.view === NavViewType.ELASTIC) {
                element = item.title;
              }
              if (item.view === NavViewType.ALWAYS_ICON) {
                element = <Icon data={item.icon} />;
              }
              if (item.view === NavViewType.ELASTIC_ICON) {
                element = <Icon data={item.icon} />;
              }
            } else {
              if (item.view === NavViewType.ALWAYS) {
                element = item.title;
              }
              if (item.view === NavViewType.ELASTIC) {
                element = <Icon data={item.icon} />;
              }
              if (item.view === NavViewType.ALWAYS_ICON) {
                element = <Icon data={item.icon} />;
              }
              if (item.view === NavViewType.ALWAYS_ICON) {
                element = null;
              }
            }
            return (
              element && (
                <LinkButton
                  key={item.url}
                  to={item.url}
                  title={item.title}
                  aria-label={item.title}
                >
                  {element}
                </LinkButton>
              )
            );
          })}
          <Button
            title="切换暗色模式"
            aria-label="切换暗色模式"
            onClick={() => setMode()}
          >
            <DarkMode />
          </Button>
        </div>
      </header>
    </>
  );
};
