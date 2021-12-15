import React from "react";
import "./Media.css";

function Media(props) {
  const { icon, name, size, src } = props;

  return (
    <div className="Media">
      <div className="Media-info">
        <span className="material-icons-outlined">{icon}</span>
        <div className="Media-info-name">
          <h4>{name}</h4>
          <h4>{size} MB</h4>
        </div>
      </div>
      <div className="Media-action">
        <span className="material-icons-outlined">file_download</span>
      </div>
    </div>
  );
}

export default Media;
