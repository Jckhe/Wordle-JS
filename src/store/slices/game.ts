"use client";
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface GameState {
  win: boolean;
  currentWord: string;
  darkmode: boolean;
  rowsLeft: number;
  currentRow: number;
  letters: Record<string, string>; // A mapping from letter to color
  savedWords: string[]; // An array of saved words
}

const initialState: GameState = {
  win: false,
  currentWord: '',
  darkmode: true,
  rowsLeft: 6,
  currentRow: 0,
  //this creates a new object of the alphabet with the letter being the key and their initial value being 'green'.
  letters: Array.from({length: 26}, (_, i) => String.fromCharCode(i + 97).toUpperCase())
  .reduce((acc, letter) => ({ 
    ...acc, 
    [letter]: 'white' 
  }), {}),
  savedWords: Array(6).fill('')
};

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getDailyWord: (state, action) => {
      state.currentWord = action.payload.today;
    },
    saveWord: (state, action) => {
      const { rowId, word } = action.payload;
      state.savedWords[rowId] = word;
      if (state.currentRow + 1 < 6) {
        state.currentRow++;
        // split the word into letters
        const letters = word.split('');
        // loop over the letters and update their colors based on the conditions
        letters.forEach((letter: string, index: number) => {
          // if the letter is in the currentWord but in the wrong order
          if (state.currentWord.includes(letter) && state.currentWord[index] !== letter) {
            state.letters[letter] = 'yellow';
          }
          // if the letter is in the correct order
          else if (state.currentWord[index] === letter) {
            state.letters[letter] = 'green';
          }
          // if the letter is not in the currentWord at all
          else {
            state.letters[letter] = 'gray';
          }
        });
        // check if the user won the game
        if (word === state.currentWord) {
          state.win = true;
        }
      }
    }
  },
})



export const { getDailyWord, saveWord } = game.actions;

//export state properties (if you want to map)

// export const countTest = (state: RootState) => state.game.count;


export default game.reducer;