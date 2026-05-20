"use client";
import * as React from "react";
import { ReactNode, useRef } from "react";
import { t } from "../../../locales";
import { Button } from "../../ui/button";

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
    <nav className="absolute top-0 left-0 flex h-[100px] w-[100px] -translate-x-[100px] items-center justify-center transition-[translate,color,background-color] duration-300 max-lg:translate-x-0">
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
