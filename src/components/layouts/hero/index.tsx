import { Caveat } from "next/font/google";
import * as React from "react";
import { fetcher } from "../../../contents";
import { t } from "../../../locales";
import { cx } from "../../../utils/class-name";
import { Image } from "../../ui/image";

const caveat = Caveat({ subsets: ["latin"] });

export const Hero: React.FC = async () => {
  const author = await fetcher.author();
  return (
    <section className="my-4">
      <Image className="mx-0 h-[6.25rem] w-[6.25rem] rounded-full [filter:var(--image-filter)] transition-[filter,color,background-color] duration-300" src={author.avatar} alt={t("article.avatar")} />
      <h1 className={cx("mt-2 mb-0 text-[2.2rem] font-bold leading-[1.25] tracking-[0.05em] text-text-title", caveat.className)}>{author.fullname}</h1>
      <p className="m-0 text-base leading-normal text-text-description">{author.description}</p>
    </section>
  );
};
