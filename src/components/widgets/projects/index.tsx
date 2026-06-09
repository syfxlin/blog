import * as React from "react";
import { ReactNode } from "react";
import { GithubAdapter } from "../../../adapters/github-adapter";
import { ProjectsData } from "../../../contents/types";
import { stars } from "../../../utils/vender";
import { Grid } from "../../layouts/grid";
import { LinkButton } from "../../ui/button";
import { Iconify } from "../../ui/iconify";

const adapter = new GithubAdapter();

export interface HeadingProps {
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <h2 className="relative mt-10 mb-3 pb-1 text-center text-[1.2rem] font-semibold text-text-paragraph before:absolute before:bottom-[-1px] before:left-1/2 before:z-[1] before:block before:h-[2.5px] before:w-8 before:-translate-x-1/2 before:rounded before:bg-[linear-gradient(var(--color-text-primary)_30%,var(--color-text-primary)_70%)] before:shadow-[var(--color-text-primary)_0_1px_3px] before:transition-all before:duration-[250ms] before:content-['']">
      {props.children}
    </h2>
  );
};

export interface IconsProps {
  link: string;
}

async function fetchGithubStars(link: string) {
  const match = /https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)/.exec(link);
  if (!match) {
    return undefined;
  }
  try {
    const data = await adapter.component({ repo: `${match[1]}/${match[2]}` });
    return data?.data?.stars;
  } catch {
    return undefined;
  }
}

export const Icons: React.FC<IconsProps> = async (props) => {
  const starCount = await fetchGithubStars(props.link);
  if (starCount !== undefined) {
    return (
      <>
        <Iconify icon="uil:github" className="h-[1.4rem] w-[1.4rem] text-text-description" />
        <span className="flex min-w-[calc(4ch+1.4rem)] items-center justify-center gap-0.5 text-[0.5rem] leading-none whitespace-nowrap text-text-description [&_svg]:h-[0.9rem] [&_svg]:w-[0.9rem]">
          <Iconify icon="ri:star-s-line" />
          <span>{stars(starCount)}</span>
        </span>
      </>
    );
  }
  return <Iconify icon="ri:link" className="h-[1.4rem] w-[1.4rem] text-text-description" />;
};

export interface ProjectsProps {
  data: Exclude<ProjectsData["categories"], undefined>;
}

export const Projects: React.FC<ProjectsProps> = async ({ data }) => {
  return (
    <>
      {data.map(category => (
        <React.Fragment key={`category-${category.name}`}>
          <Heading>{category.name}</Heading>
          <Grid>
            {category.projects.map((project) => {
              return (
                <LinkButton
                  key={`project-${project.link}`}
                  className="flex gap-2 border-b-0 p-4 text-start"
                  href={project.link}
                  aria-label={project.name}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <span className="block flex-1 overflow-hidden">
                    <span className="flex items-center gap-2 overflow-hidden text-base leading-normal font-semibold text-text-paragraph [&>span:first-child]:block [&>span:first-child]:overflow-hidden [&>span:first-child]:text-ellipsis [&>span:first-child]:whitespace-nowrap">
                      <span>{project.name}</span>
                      {project.components.map(component => (
                        <Iconify key={`component-${component}`} icon={component} className="h-[0.9rem] w-[0.9rem] text-text-description" />
                      ))}
                    </span>
                    <span className="line-clamp-2 overflow-hidden text-start text-[0.8rem] leading-normal text-ellipsis whitespace-normal text-text-paragraph">{project.description}</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-0.5">
                    <Icons link={project.link} />
                  </span>
                </LinkButton>
              );
            })}
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};
