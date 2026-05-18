"use client";
import * as React from "react";
import { ReactNode, useState } from "react";
import { t } from "../../../locales";
import { Spotlight } from "../../root/spotlight";
import { Button } from "../../ui/button";
import { hideMenu } from "./menu";
import styles from "./styles.module.css";

export interface SearchProps {
  icon: ReactNode;
}

export const Search: React.FC<SearchProps> = ({ icon }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Button
        tooltip={{ placement: "left" }}
        aria-label={t("header.search")}
        className={styles.view_icon}
        onClick={() => {
          hideMenu();
          setActive(p => !p);
        }}
      >
        <span>{t("header.search")}</span>
        {icon}
      </Button>
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
