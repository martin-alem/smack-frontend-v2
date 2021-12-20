import React from "react";
import "./More.css";

function More(props) {
  const { contents } = props;
  const moreRef = React.useRef();
  const toggleMore = () => {
    moreRef.current.classList.toggle("hide");
  };
  return (
    <div className="More">
      <span onClick={toggleMore} className="material-icons-outlined">
        more_vert
      </span>
      <div ref={moreRef} className="More-content hide">
        {contents.map((content, index) => {
          return (
            <div onClick={content.action} key={index} className="More-item">
              <p className="More-item-text">{content.text}</p>
              <span className="material-icons-outlined">{content.icon}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default More;
