"use client";
import { useAppSelector, useAppDispatch} from "@/store/hooks";
import { getDailyWord } from "@/store/slices/game";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";

export default function Board() {
  const word = useSelector((state: RootState) => state.game.currentWord);

  return (
    <div className="board">
      <p>{word}</p>
    </div>
  )
}