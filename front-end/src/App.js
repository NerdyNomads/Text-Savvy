/* global chrome */
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import SideBar from "./organisms/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { addNewAccount, getAccountByAuth0Id } from "./util/requests";

function App() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState("");
  const { isAuthenticated, user, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  
  async function getAccount(auth0Id) {
    let result = await getAccountByAuth0Id(auth0Id);
    return result?.data[0];
  }

  useEffect(async () => {
    let abortController = new AbortController();
    if(isLoading){
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

      if (chrome.runtime !== undefined) {
        // send auth0Id to web extension
        window.localStorage.setItem("auth0Id", auth0Id);
        chrome.runtime.sendMessage(`${process.env.REACT_APP_EXTENSION_ID}`, { messageFromWeb: window.localStorage });
      }

      let account = await getAccount(auth0Id);

      if (account) {
        setCurrentAccountId(account._id);
      } else {
        const response = await addNewAccount(auth0Id,user);
        setCurrentAccountId(response.data._id);
      }
    }

    getToken({});
    return () => {  
      abortController.abort();  
    }; 
  }, [isLoading, isAuthenticated]);

  const getToken = (options) => {
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
