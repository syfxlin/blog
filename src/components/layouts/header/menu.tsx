"use client";
import * as React from "react";
import { ReactNode, useRef } from "react";
import { t } from "../../../locales";
import { Button } from "../../ui/button";
import styles from "./styles.module.css";

export function showMenu() {
  document.body.style.transform = "translateX(100px)";
}

export function hideMenu() {
  document.body.style.transform = "";
}

export interface MenuProps {
  icon: ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ icon }) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <nav className={styles.menu}>
      <Button
        ref={ref}
        aria-label={t("header.menu")}
        onClick={() => {
          if (document.body.style.transform) {
            hideMenu();
          } else {
            showMenu();
          }
        }}
      >
        {icon}
      </Button>
    </nav>
  );
};
