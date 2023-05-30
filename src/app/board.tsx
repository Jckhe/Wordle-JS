"use client";
import { useAppSelector, useAppDispatch} from "@/store/hooks";
import { getDailyWord } from "@/store/slices/game";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Row from "./row";
import { useEffect, useState } from "react";
import PlayAgain from "./playagain";
import { Alert, Fade, Slide } from "@mui/material";

function InvalidAlert({invalid}: {invalid: boolean}) {
  return (
      <Fade style={{
        position: "absolute",
        top: "20vh"
      }} in={invalid} mountOnEnter unmountOnExit>
          <Alert variant="filled" severity="error">
            Invalid Word!
          </Alert>
      </Fade>
  )
}

export default function Board() {
  const word = useSelector((state: RootState) => state.game.currentWord);
  const [invalidWordAlert, toggleInvalidAlert] = useState(false);
  const rows = Array.from({length: 6}, (_, index) => <Row invalidWord={toggleInvalidAlert} key={index} id={index} />);
  const victory = useSelector((state: RootState) => state.game.win);
  

  useEffect(() => {
    if (invalidWordAlert) {
      const timer = setTimeout(() => {
        toggleInvalidAlert(false);
      }, 3333); // Change this value to adjust the time in milliseconds

      //cleanup
      return () => clearTimeout(timer);
    }
  }, [invalidWordAlert])

  return (
    <div className="board">
      {invalidWordAlert && <InvalidAlert invalid={invalidWordAlert} />}
      {victory && <h3 className="winner-message">Winner!</h3>}
      <div className="inner-board">
        {rows}
      </div>
      {victory && <PlayAgain />}
    </div>
  )
}