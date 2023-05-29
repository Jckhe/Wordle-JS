"use client"
import { resetGame } from "@/store/slices/game";
import { useDispatch } from "react-redux";



const PlayAgain = () => {
  const dispatch = useDispatch();

  return (
    <button
    className="playAgainBtn"
    onClick={() => dispatch(resetGame())}
    >
      Play Again?
    </button>
  )
}

export default PlayAgain;