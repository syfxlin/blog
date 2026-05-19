"use client";
import * as React from "react";
import { ReactNode } from "react";
import { t } from "../../../locales";
import { resolve } from "../../../utils/vender";
import { LinkButton } from "../../ui/button";
import { viewElasticClassName } from "./classes";
import { hideMenu } from "./menu";

export interface BlogProps {
  icon: ReactNode;
}

export const Blog: React.FC<BlogProps> = ({ icon }) => {
  return (
    <LinkButton
      tooltip={{ placement: "left" }}
      aria-label={t("header.blog")}
      href={resolve("page", 1)}
      className={viewElasticClassName}
      onClick={() => hideMenu()}
    >
      <span><span>「</span>{t("header.blog")}<span>」</span></span>
      {icon}
    </LinkButton>
  );
};
