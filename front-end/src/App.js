import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./atoms/LoginButton";
import LogoutButton from "./atoms/LogoutButton";
import TextList from "./molecules/TextList";
import "./App.css";

import axios from "axios";

const mockData = [
  {	id: 1,
    text: "It does not matter how fast you go as long as you do not stop It does not matter how fast you go as long as you do not stop. do not stop.do nop. do not stop.do nop. do not stop.do n",
    source: "https://cdn.vox-cdn.com/thumbor/zL48ecvX2NkW1cU0FEfgrCc7Rgo=/0x0:900x500/920x613/filters:focal(378x178:522x322):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49493993/this-is-fine.0.jpg" 
  }, 

  {
    id: 2,
    text: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway. Because bees don’t care what humans think is impossible.” SEQ. 75 - “INTRO TO BARRY” INT. BENSON HOUSE - DAY ANGLE ON: Sneakers on the ground. Camera PANS UP to reveal BARRY BENSON’S BEDROOM ANGLE ON: Barry’s hand flipping through different sweaters in his closet. BARRY Yellow black, yellow black, yellow black, yellow black, yellow black, yellow black...oohh, black and yellow... ANGLE ON: ",

    source: "https://cdn.vox-cdn.com/thumbor/zL48ecvX2NkW1cU0FEfgrCc7Rgo=/0x0:900x500/920x613/filters:focal(378x178:522x322):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49493993/this-is-fine.0.jpg"

  },
  {
    id: 3,
    text: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway. Because bees don’t care what humans think is impossible.” SEQ. 75 - “INTRO TO BARRY” INT. BENSON HOUSE - DAY ANGLE ON: Sneakers on the ground. Camera PANS UP to reveal BARRY BENSON’S BEDROOM ANGLE ON: Barry’s hand flipping through different sweaters in his closet. BARRY Yellow black, yellow black, yellow black, yellow black, yellow black, yellow black...oohh, black and yellow... ANGLE ON: ",

    source: "https://cdn.vox-cdn.com/thumbor/zL48ecvX2NkW1cU0FEfgrCc7Rgo=/0x0:900x500/920x613/filters:focal(378x178:522x322):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49493993/this-is-fine.0.jpg"

  },
  {
    id: 4,
    text: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway. Because bees don’t care what humans think is impossible.” SEQ. 75 - “INTRO TO BARRY” INT. BENSON HOUSE - DAY ANGLE ON: Sneakers on the ground. Camera PANS UP to reveal BARRY BENSON’S BEDROOM ANGLE ON: Barry’s hand flipping through different sweaters in his closet. BARRY Yellow black, yellow black, yellow black, yellow black, yellow black, yellow black...oohh, black and yellow... ANGLE ON: ",

    source: "https://cdn.vox-cdn.com/thumbor/zL48ecvX2NkW1cU0FEfgrCc7Rgo=/0x0:900x500/920x613/filters:focal(378x178:522x322):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49493993/this-is-fine.0.jpg"

  },];

function App() {
  const { isAuthenticated, user } = useAuth0();

  /**
   * This function only runs when the state "isAuthenticated" changes.
   * If someone is currently logged in, then this checks if the account needs to be added to the database.
   */
  useEffect(async () => {
    if (isAuthenticated) {
      let userId = user.sub;
      let auth0Id = userId.replace("|", "-");	// Must replace "|" to allow for GET query

      if (await isNewAccount(auth0Id)) {
        addNewAccount(auth0Id);
      }
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    return <><LoginButton/></>;

  } 
  else {
    return (
      <div className="App">
        <LogoutButton/>
        <TextList list={mockData}/>
        
      </div>
    );}
}

export default App;
