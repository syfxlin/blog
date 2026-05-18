import * as React from "react";
import { ReactNode } from "react";
import { GithubAdapter } from "../../../adapters/github-adapter";
import { ProjectsData } from "../../../contents/types";
import { stars } from "../../../utils/vender";
import { Grid } from "../../layouts/grid";
import { LinkButton } from "../../ui/button";
import { Iconify } from "../../ui/iconify";
import styles from "./styles.module.css";

const adapter = new GithubAdapter();

export interface HeadingProps {
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <h2 className={styles.heading}>
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
        <Iconify icon="uil:github" className={styles.icon} />
        <span className={styles.github}>
          <Iconify icon="ri:star-s-line" />
          <span>{stars(starCount)}</span>
        </span>
      </>
    );
  }
  return <Iconify icon="ri:link" className={styles.icon} />;
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
                  className={styles.link}
                  href={project.link}
                  aria-label={project.name}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <span className={styles.left}>
                    <span className={styles.name}>
                      <span>{project.name}</span>
                      {project.components.map(component => (
                        <Iconify key={`component-${component}`} icon={component} className={styles.component} />
                      ))}
                    </span>
                    <span className={styles.text}>{project.description}</span>
                  </span>
                  <span className={styles.right}>
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
