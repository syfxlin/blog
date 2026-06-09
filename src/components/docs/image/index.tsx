import * as React from "react";
import { Image as UImage } from "../../ui/image";

export interface ImageProps {
  src: string;
  alt: string;
  title?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <figure className="my-4">
      <UImage zoom src={props.src} alt={props.alt} title={props.title} className="rounded" />
      {(props.title || props.alt) && <figcaption className="mt-1 text-center text-[0.8rem]">{props.title || props.alt}</figcaption>}
    </figure>
  );
};
