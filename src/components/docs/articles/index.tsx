import * as React from "react";
import { fetcher } from "../../../contents";
import { Link } from "../../ui/link";

export const Articles: React.FC = React.memo(async () => {
  const articles = await fetcher.posts();
  return (
    <ul className="ps-8 [&_li]:my-2 [&_p:last-of-type]:my-0">
      {articles.items.slice(0, 3).map(item => (
        <li key={item.link}>
          <Link aria-label={item.title} href={item.link}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
});
