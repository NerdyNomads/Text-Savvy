// built-in
import React from "react";
import ReactDOM from "react-dom";

// third-party
import { Auth0Provider } from "@auth0/auth0-react";

// local
import "./index.css";
import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience= process.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
      domain={domain} 
      clientId={clientId} 
      redirectUri={window.location.origin}
      audience={audience}
      useRefreshTokens={true}
      cacheLocation="localstorage">
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
