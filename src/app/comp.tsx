"use client";
import { useAppSelector } from "@/store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Count() {
  
  const count = useSelector((state: RootState) => state.game.count);

  return (
    <>
      {count}
    </>
  )
}