import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentAccountId } from "./util/authentication";

import SideBar from "./organisms/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState("");
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

  useEffect(async () => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      console.log("not authenticated. redirecting to login");
      loginWithRedirect();
      return;
    } else {
      let accountId = await getCurrentAccountId(user); 
      setCurrentAccountId(accountId);
    }
  }, [isLoading, isAuthenticated]);

  const handleGoToWorkspace = (id) => setCurrentWorkspaceId(id);

  if (!currentAccountId) {
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
