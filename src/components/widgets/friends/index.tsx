"use client";
import * as React from "react";
import { useMemo } from "react";
import { FriendsData } from "../../../contents/types";
import { shuffle } from "../../../utils/vender";
import { Grid } from "../../layouts/grid";
import { LinkButton } from "../../ui/button";
import { ClientOnly } from "../../ui/client-only/ClientOnly";
import { Image } from "../../ui/image";

export interface FriendsProps {
  data: Exclude<FriendsData["links"], undefined>;
}

export const Friends: React.FC<FriendsProps> = ({ data }) => {
  const links = useMemo(() => shuffle(data ?? []), [data]);
  return (
    <ClientOnly>
      {() => (
        <Grid>
          {links.map(i => (
            <LinkButton
              key={`link-${i.link}`}
              className="flex gap-4 border-b-0 p-4 text-start"
              href={i.link}
              aria-label={i.name}
              target="_blank"
              rel="nofollow noopener"
            >
              <Image src={i.avatar} alt={i.name} className="h-[3.75rem] w-[3.75rem] basis-[3.75rem] overflow-hidden rounded-full" />
              <span className="block flex-1 overflow-hidden">
                <span className="block overflow-hidden text-start text-base leading-normal font-semibold text-ellipsis whitespace-nowrap text-text-paragraph">{i.name}</span>
                <span className="block overflow-hidden text-start text-[0.8rem] leading-normal text-ellipsis whitespace-nowrap text-text-paragraph">{i.author || <span className="block overflow-hidden text-start text-[0.8rem] leading-normal text-ellipsis whitespace-nowrap text-text-paragraph">-</span>}</span>
                <span className="block overflow-hidden text-start text-[0.8rem] leading-normal text-ellipsis whitespace-nowrap text-text-paragraph">{i.description || <span className="block overflow-hidden text-start text-[0.8rem] leading-normal text-ellipsis whitespace-nowrap text-text-paragraph">-</span>}</span>
              </span>
            </LinkButton>
          ))}
        </Grid>
      )}
    </ClientOnly>
  );
};
