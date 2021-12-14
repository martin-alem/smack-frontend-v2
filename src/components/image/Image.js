import React from "react";
import "./Image.css";

function Image(props) {
  const { dimension, alt, src } = props;

  return (
    <div className="Image">
      <img src={src} alt={alt} width={dimension} height={dimension} />
    </div>
  );
}

export default Image;
