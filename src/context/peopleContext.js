import React from "react";

const PeopleContext = React.createContext();

function PeopleContextProvider(props) {
  const [people, setPeople] = React.useState([]);
  return <PeopleContext.Provider value={{ people, setPeople }}>{props.children}</PeopleContext.Provider>;
}

export { PeopleContext, PeopleContextProvider };
