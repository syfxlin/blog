"use client";
import React, { ReactNode } from "react";
import { LinkButton } from "../../ui/button";
import { resolve } from "../../../utils/vender";
import * as styles from "./styles.css";

export type RssProps = {
  icon: ReactNode;
};

export const Blog: React.FC<RssProps> = ({ icon }) => {
  return (
    <LinkButton tippy aria-label="创作" href={resolve("page", 1)} className={styles.view_elastic}>
      <span>创作</span>
      {icon}
    </LinkButton>
  );
};
