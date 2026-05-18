import * as React from "react";
import { ArticleData } from "../../../contents/types";
import { t } from "../../../locales";
import { Renderer } from "../../docs";
import { MetaInfo } from "../../layouts/meta-info";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Image } from "../../ui/image";
import { Copyright } from "../../widgets/copyright";
import { Template } from "../template";

export interface TemplatePageProps {
  data: ArticleData;
  prev?: {
    name: string;
    link: string;
  };
  next?: {
    name: string;
    link: string;
  };
}

export const TemplatePage: React.FC<TemplatePageProps> = async ({ data, prev, next }) => {
  return (
    <Template
      name={data.title}
      link={data.link}
      desc={<MetaInfo data={data} />}
      artalk={true}
      headings={data.body.headings}
      pagination={{ prev, next }}
      before={(
        <>
          {data.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <Image src={data.thumbnail} alt={t("article.thumbnail")} />
            </AspectRatio>
          )}
        </>
      )}
    >
      <Renderer document={data.body.document} />
      {data.layout === "post" && <Copyright data={data} />}
    </Template>
  );
};
