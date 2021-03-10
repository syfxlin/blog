import React from "react";
import styled from "styled-components";

type Props = {
  type?: "warn" | "info" | "error" | "success";
};

const MessageBox: React.FC<Props> = ({ type, children }) => {
  return <Box className={type || "success"}>{children}</Box>;
};

const Box = styled.div`
  margin: 15px 0;
  padding: 1em 1em;

  p {
    margin-bottom: 0;
  }

  &.warn {
    background: #faf3d4;
    color: #a6a377;
  }

  &.info {
    background: #d0e6f0;
    color: #7190a2;
  }

  &.success {
    border: 1px solid #def1bf;
    background: #d8ebce;
    color: #748f5d;
  }

  &.error {
    border: 1px solid #ffdbdb;
    background: #fde2e2;
    color: #ac888a;
  }
`;

export default MessageBox;
