import React from "react";
import { css, Global } from "@emotion/react";

export const NormalizeCSS: React.FC = () => {
  return (
    <Global
      styles={css`
        html {
          font-family: sans-serif;
          line-height: 1.15;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }

        body {
          margin: 0;
        }

        article,
        aside,
        footer,
        header,
        nav,
        section,
        figcaption,
        figure,
        main {
          display: block;
        }

        h1 {
          font-size: 2em;
        }

        hr {
          box-sizing: content-box;
          height: 0;
          overflow: visible;
        }

        pre {
          font-family: monospace, monospace;
          font-size: 1em;
        }

        a {
          background: transparent;
          text-decoration-skip: objects;

          &:active,
          &:hover {
            outline-width: 0;
          }
        }

        abbr[title] {
          border-bottom: none;
          text-decoration: underline;
        }

        b,
        strong {
          font-weight: bolder;
        }

        code,
        kbd,
        samp {
          font-family: monospace, monospace;
          font-size: 1em;
        }

        dfn {
          font-style: italic;
        }

        mark {
          background-color: #ff0;
          color: #000;
        }

        small {
          font-size: 80%;
        }

        sub,
        sup {
          font-size: 75%;
          line-height: 0;
          position: relative;
          vertical-align: baseline;
        }

        sup {
          top: -0.5em;
        }

        sub {
          bottom: -0.25em;
        }

        audio,
        video {
          display: inline-block;

          &:not([controls]) {
            display: none;
            height: 0;
          }
        }

        img {
          border-style: none;
          vertical-align: middle;
        }

        svg:not(:root) {
          overflow: hidden;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: sans-serif;
          font-size: 100%;
          line-height: 1.15;
          margin: 0;
        }

        button,
        input {
          overflow: visible;
        }

        button,
        select {
          text-transform: none;
        }

        button,
        [type="reset"],
        [type="submit"] {
          -webkit-appearance: button;
        }

        button::-moz-focus-inner,
        [type="button"]::-moz-focus-inner,
        [type="reset"]::-moz-focus-inner,
        [type="submit"]::-moz-focus-inner {
          border-style: none;
          padding: 0;
        }

        button:-moz-focusring,
        [type="button"]:-moz-focusring,
        [type="reset"]:-moz-focusring,
        [type="submit"]:-moz-focusring {
          outline: 1px dotted ButtonText;
        }

        legend {
          box-sizing: border-box;
          color: inherit;
          display: table;
          max-width: 100%;
          padding: 0;
          white-space: normal;
        }

        progress {
          display: inline-block;
          vertical-align: baseline;
        }

        textarea {
          overflow: auto;
        }

        [type="checkbox"],
        [type="radio"] {
          box-sizing: border-box;
          padding: 0;
        }

        [type="number"]::-webkit-inner-spin-button,
        [type="number"]::-webkit-outer-spin-button {
          height: auto;
        }

        [type="search"] {
          appearance: textfield;
          outline-offset: -2px;
        }

        [type="search"]::-webkit-search-cancel-button,
        [type="search"]::-webkit-search-decoration {
          appearance: none;
        }

        ::-webkit-file-upload-button {
          appearance: button;
          font: inherit;
        }

        details,
        menu {
          display: block;
        }

        summary {
          display: list-item;
        }

        canvas {
          display: inline-block;
        }

        template {
          display: none;
        }

        [hidden] {
          display: none;
        }
      `}
    />
  );
};
