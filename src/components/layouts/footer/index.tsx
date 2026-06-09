import * as React from "react";
import { fetcher } from "../../../contents";
import { Divider } from "../../ui/divider";
import { Link } from "../../ui/link";

export const Footer: React.FC = async () => {
  const [seo, author, footer] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.footer()]);
  // eslint-disable-next-line react/purity -- The footer intentionally displays the year at render time.
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-8 py-5 text-center [&_a]:text-sm [&_a]:text-text-description [&_a]:underline [&_p]:m-px [&_p]:text-sm [&_p]:text-text-description [&_span]:text-sm [&_span]:text-text-description">
      <p>
        {footer.main.map((item, index) => (
          <React.Fragment key={item.link}>
            {index !== 0 && <Divider orientation="vertical" />}
            <Link unstyled aria-label={item.title} href={item.link}>
              {item.title}
            </Link>
          </React.Fragment>
        ))}
      </p>
      <p>
        Copyright © {seo.birthday.getFullYear()}-{currentYear} {author.fullname}
      </p>
      <p>
        Theme{" "}
        <Link unstyled href="https://github.com/syfxlin/next-theme-coline">
          Coline
        </Link>
        {" "}by{" "}
        <Link unstyled href="https://ixk.me">
          Otstar Lin
        </Link>
        <Divider orientation="vertical" />
        Powered by{" "}
        <Link unstyled href="https://nextjs.org">
          Next.js
        </Link>
      </p>
    </footer>
  );
};
