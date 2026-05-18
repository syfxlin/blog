"use client";
import * as React from "react";
import styles from "./styles.module.css";

export const Articles: React.FC = React.memo(async () => {
  return (
    <ul className={styles.container}>
      <li>Article 1</li>
      <li>Article 2</li>
      <li>Article 3</li>
    </ul>
  );
});
