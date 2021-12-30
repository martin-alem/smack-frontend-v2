import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import httpAgent from "../../utils/httpAgent";

function ProtectedRoute({ component: Component, ...rest }) {
  const userContext = React.useContext(UserContext);
  React.useEffect(() => {
    const { _id } = userContext.user || "";
    const url = `${process.env.REACT_APP_API}/api/v1/authorize/${_id}`;
    const method = "GET";
    const option = {
      headers: { Accept: "application/json" },
      body: null,
    };
    httpAgent(method, url, option)
      .then(response => {
        if (!response.ok) {
          window.localStorage.clear();
          window.location.replace("/");
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
  return (
    <Route
      {...rest}
      render={props => {
        if (JSON.parse(localStorage.getItem("smack_user")) && Object.keys(JSON.parse(localStorage.getItem("smack_user"))).length > 0) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ path: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
