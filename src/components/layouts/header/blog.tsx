"use client";
import * as React from "react";
import { ReactNode } from "react";
import { t } from "../../../locales";
import { resolve } from "../../../utils/vender";
import { LinkButton } from "../../ui/button";
import { hideMenu } from "./menu";
import styles from "./styles.module.css";

export interface BlogProps {
  icon: ReactNode;
}

export const Blog: React.FC<BlogProps> = ({ icon }) => {
  return (
    <LinkButton
      tooltip={{ placement: "left" }}
      aria-label={t("header.blog")}
      href={resolve("page", 1)}
      className={styles.view_elastic}
      onClick={() => hideMenu()}
    >
      <span><span>「</span>{t("header.blog")}<span>」</span></span>
      {icon}
    </LinkButton>
  );
};
