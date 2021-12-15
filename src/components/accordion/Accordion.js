import React from "react";
import "./Accordion.css";

function Accordion(props) {
  const { children, name, title, icon, type } = props;

  return (
    <div className="Accordion">
      <input type="checkbox" name={name} className="Accordion-input" id={type} />
      <label className="Accordion-label" htmlFor={type}>
        <span className="material-icons-outlined">{icon}</span>
        <p className="Accordion-title">{title}</p>
        <span className="material-icons-outlined">navigate_next</span>
      </label>
      <div className="Accordion-content">{children}</div>
    </div>
  );
}

export default Accordion;
