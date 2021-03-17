import React from "react";
import styled from "styled-components";
import { links, lostConnection } from "../../config/links";
import FriendCard from "./FriendCard";

function shuffle(a: any[]): any[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

type Props = {
  imgBaseUrl: string;
};

const Friends: React.FC<Props> = ({ imgBaseUrl }) => {
  return (
    <>
      <List className={"columns grid-md"}>
        {shuffle(links).map((link) => (
          <li className={"column col-6 col-md-12"} key={link.name}>
            <FriendCard {...link} imgBaseUrl={imgBaseUrl} />
          </li>
        ))}
      </List>
      {lostConnection.length > 0 && (
        <>
          <h2>无法访问的友链</h2>
          <ul>
            {lostConnection.map((link) => (
              <li key={link.name}>
                <a href={link.url} target={"_blank"} rel={"noreferrer"}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const List = styled.ul`
  list-style: none;
`;

export default Friends;
