import React from "react";
import "./SearchInput.css";

function SearchInput(props) {
  const { placeholder, name } = props;

  return (
    <div className="SearchInput">
      <input type="search" name={name} placeholder={placeholder} className="SearchInput-input" />
      <span className="material-icons-outlined">search</span>
    </div>
  );
}

export default SearchInput;
