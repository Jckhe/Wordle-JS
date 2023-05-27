"use client"
import { getProjects } from "@/helperFunctions";
import { useAppDispatch } from "@/store/hooks";
import { getDailyWord } from "@/store/slices/game";
import { useEffect } from "react";
import Board from "./board"

export default function Game() {
  const dispatch = useAppDispatch();

  // const count = useSelector((state: RootState) => state.game.count);
  useEffect(() => {
    console.log("mounted")
    getProjects().then(word => dispatch(getDailyWord(word)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="game">
      <Board />
    </div>
  )
}