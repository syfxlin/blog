import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Image: React.FC<JSX.IntrinsicElements["img"]> = (props) => {
  return (
    <Zoom zoomMargin={40}>
      <img {...props} />
    </Zoom>
  );
};

export default Image;
