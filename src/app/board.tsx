"use client";
import { useAppSelector, useAppDispatch} from "@/store/hooks";
import { getDailyWord } from "@/store/slices/game";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Row from "./row";
import { useEffect, useState } from "react";
import PlayAgain from "./playagain";

export default function Board() {
  const word = useSelector((state: RootState) => state.game.currentWord);
  const rows = Array.from({length: 6}, (_, index) => <Row key={index} id={index} />);
  const victory = useSelector((state: RootState) => state.game.win);

  return (
    <div className="board">
      {victory && <h3 className="winner-message">Winner!</h3>}
      <div className="inner-board">
        {rows}
      </div>
      {victory && <PlayAgain />}
    </div>
  )
}