"use client";
import * as React from "react";
import { useMemo } from "react";
import { FriendsData } from "../../../contents/types";
import { shuffle } from "../../../utils/vender";
import { Grid } from "../../layouts/grid";
import { LinkButton } from "../../ui/button";
import { ClientOnly } from "../../ui/client-only/ClientOnly";
import { Image } from "../../ui/image";
import styles from "./styles.module.css";

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
              className={styles.link}
              href={i.link}
              aria-label={i.name}
              target="_blank"
              rel="nofollow noopener"
            >
              <Image src={i.avatar} alt={i.name} className={styles.avatar} />
              <span className={styles.section}>
                <span className={styles.name}>{i.name}</span>
                <span className={styles.text}>{i.author || <span className={styles.text}>-</span>}</span>
                <span className={styles.text}>{i.description || <span className={styles.text}>-</span>}</span>
              </span>
            </LinkButton>
          ))}
        </Grid>
      )}
    </ClientOnly>
  );
};
