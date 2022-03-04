import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "./atoms/LogoutButton";
import TextList from "./molecules/TextList";

import "./App.css";

import axios from "axios";


function App() {
  const [ dataIsLoaded, setDataIsLoaded ] = useState(false);
  const { isAuthenticated, user, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [ textItems, setTextItems ] = useState(null);

  /**
   * Grabs data from the db.
   * 
   * @returns 				returns data from the db. 
   */
  async function getTexts() {
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/texts`);
    return result?.data;
  }

  useEffect(async () => {
    let texts = await getTexts();
    setDataIsLoaded(true);
    if (dataIsLoaded) {
      setTextItems(texts);
    }
  }, [dataIsLoaded]);

  /**
   * Checks if the user that is logged in has been added to the database.
   * 
   * @param {*} auth0Id 		The Auth0 ID of the current user.
   * @returns 				If no account exists in the database, return true.
   */
  async function isNewAccount(auth0Id) {
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/auth0/` + auth0Id);

    return result?.data.length == 0;
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
      .then((res) => console.log(res.data));
  }

  useEffect(async () => {
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

      if (await isNewAccount(auth0Id)) {
        addNewAccount(auth0Id);
      }
    }

    getToken({});

  }, [isLoading, isAuthenticated]);

  const getToken = (options) => {
    console.log(`retrieving token for '${options.audience}'`);
    getAccessTokenSilently(options).then()
      .catch(e => {
        console.error("failed to get token!", e);
      });
  };

  if (!isAuthenticated) {
    return <></>;
  } else {
    return (
      <div className="App">
        <LogoutButton/>
        { textItems &&
          <TextList list={textItems}/>
        }
      </div>
    );
  }	
}

export default App;
