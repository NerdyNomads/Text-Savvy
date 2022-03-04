/* eslint-disable */

import React, { useState, useEffect } from "react";
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
  const [ dataIsLoaded, setDataIsLoaded ] = useState(false);
  const { isAuthenticated } = useAuth0();
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

  if (!isAuthenticated) {
    return <><LoginButton/></>;

  } 
  else {
    return (
      <div className="App">
        <LogoutButton/>
        <TextList list={textItems}/>
      </div>
    );}
}

export default App;
