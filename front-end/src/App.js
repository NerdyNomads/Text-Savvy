import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import SideBar from "./organisms/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState("");
  const { isAuthenticated, user, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  
  async function getAccount(auth0Id) {
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/auth0/` + auth0Id);

    return result?.data[0];
  }

  /**
   * Adds a new account to the database.
   * 
   * @param {*} auth0Id 			The Auth0 ID of the current user.
   */
  async function addNewAccount(auth0Id) {
    const account = {
      auth0Id: auth0Id,
      name: user.name,
      email: user.email,
      workspaces: []
    };

    await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/add/`, account)
      .then((res) => {
        setCurrentAccountId(res.data._id);
      });
  }

  useEffect(async () => {
    let abortController = new AbortController();
    if(isLoading){
      console.log("app is loading");
      return;
    }

    if(!isAuthenticated){
      console.log("not authenticated. redirecting to login");
      loginWithRedirect();
      return;
    
    // If someone is currently logged in, then this checks if the account needs to be added to the database.
    } else {
      let userId = user.sub;
      let auth0Id = userId.replace("|", "-");	// Must replace "|" to allow for GET query

      let account = await getAccount(auth0Id);

      if (account) {
        setCurrentAccountId(account._id);
      } else {
        addNewAccount(auth0Id);
      }
    }

    getToken({});
    return () => {  
      abortController.abort();  
    }; 
  }, [isLoading, isAuthenticated]);

  const getToken = (options) => {
    console.log(`retrieving token for '${options.audience}'`);
    getAccessTokenSilently(options).then()
      .catch(e => {
        console.error("failed to get token!", e);
      });
  };
  
  const handleGoToWorkspace = (id) => setCurrentWorkspaceId(id);

  if (!isAuthenticated || !currentAccountId) {
    return <></>;
  } else {
    return (
      <div className="App">
        <SideBar onClickWorkspace={handleGoToWorkspace} accountId={currentAccountId}/>
        <Dashboard workspaceId={currentWorkspaceId}/>
      </div>
    );
  }	
}

export default App;
