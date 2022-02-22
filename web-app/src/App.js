import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
   
      
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/external-api" component={ExternalApi} />

     

      </div>
    </Router>
  );
};




export default App;