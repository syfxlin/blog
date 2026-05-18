"use client";
import { useTheme } from "next-themes";
import * as React from "react";
import { ReactNode } from "react";
import { t } from "../../../locales";
import { Button } from "../../ui/button";
import { hideMenu } from "./menu";
import styles from "./styles.module.css";

export interface ThemeProps {
  icon: ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({ icon }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      className={styles.view_icon}
      aria-label={t("theme.switch")}
      tooltip={{ placement: "left", content: t("theme.mode", theme === "system" ? `${theme} (${resolvedTheme})` : theme) }}
      onClick={() => {
        hideMenu();
        if (theme === "system") {
          setTheme("light");
        } else if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("system");
        }
      }}
    >
      <span>{t("theme.name")}</span>
      {icon}
    </Button>
  );
};
