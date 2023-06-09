"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const Keyboard = () => {
  // Create array of all letters in alphabet
  const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(i + 97).toUpperCase());
  const letters = useSelector((state: RootState) => state.game.letters);

  // Function to handle click of a key
  const handleClick = (letter: any) => {
    console.log(`Key ${letter} clicked.`);
  };

  return (
    <div className="keyboard">
      {alphabet.map((letter) => 
        <button 
          key={letter} 
          style={{
            width: "4vw",
            height: "7vh",
            margin: "0.1vw", 
            fontSize: "2vmin",
            color: "black",
            backgroundColor: `${letters[letter]}`,
            border: "0.1vw solid #ddd",
            borderRadius: "0.5vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => handleClick(letter)}
        >
          {letter.toUpperCase()}
        </button>
      )}
    </div>
  );
};

export default Keyboard;