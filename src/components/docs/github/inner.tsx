import * as React from "react";
import { AdapterResponse } from "../../../adapters/adapter";
import { GithubRequest, GithubResponse } from "../../../adapters/github-adapter";
import { stars } from "../../../utils/vender";
import { Link } from "../../ui/link";

const containerClassName = String.raw`relative my-4 flex flex-col gap-2 overflow-hidden bg-background-card px-6 py-5 text-base after:absolute after:top-[-35px] after:right-[-30px] after:h-[150px] after:w-[150px] after:bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill%3D%22hsl(230%2C%201%25%2C%2062%25)%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z%22%2F%3E%3C%2Fsvg%3E")] after:bg-center after:bg-no-repeat after:opacity-10 after:content-[''] [&_a]:border-b-0`;

export const GithubInner: React.FC<AdapterResponse<GithubRequest, GithubResponse>> = React.memo((query) => {
  return (
    <div className={containerClassName}>
      <div className="flex items-center gap-2 fill-text-description text-base text-text-description [&_svg]:mt-[0.3rem] [&_svg]:h-4 [&_svg]:w-4">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
          />
        </svg>
        <Link href={`https://github.com/${query.params.repo}`} aria-label={query.params.repo}>
          {query.params.repo}
        </Link>
      </div>
      {query.data && <div className="flex items-center fill-text-description text-[0.9rem] text-text-description">{query.data.description}</div>}
      {query.data && (
        <div className="flex items-center gap-6 fill-text-description text-[0.8rem] text-text-description [&_div]:flex [&_div]:items-center [&_div]:gap-2 [&_div:first-child>span:first-child]:inline-block [&_div:first-child>span:first-child]:h-[0.8rem] [&_div:first-child>span:first-child]:w-[0.8rem] [&_div:first-child>span:first-child]:rounded-full [&_div>span:first-child]:mt-[0.075rem] [&_div>svg:first-child]:mt-[0.075rem] [&_svg]:h-[0.9rem] [&_svg]:w-[0.9rem]">
          <div>
            <span style={{ background: query.data.color }} />
            <span>{query.data.language}</span>
          </div>
          <div>
            <svg viewBox="0 0 16 16" aria-label="stars">
              <path
                fillRule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              />
            </svg>
            <span>{stars(query.data.stars)}</span>
          </div>
          <div>
            <svg viewBox="0 0 16 16" aria-label="fork">
              <path
                fillRule="evenodd"
                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
              />
            </svg>
            <span>{stars(query.data.forks)}</span>
          </div>
        </div>
      )}
    </div>
  );
});
