"use client";
import { useAppSelector, useAppDispatch} from "@/store/hooks";
import { getDailyWord } from "@/store/slices/game";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Row from "./row";
import { useEffect, useState } from "react";

export default function Board() {
  const word = useSelector((state: RootState) => state.game.currentWord);
  const rows = Array.from({length: 6}, (_, index) => <Row key={index} id={index} />);


  return (
    <div className="board">
      <div className="inner-board">
        {rows}
      </div>
    </div>
  )
}