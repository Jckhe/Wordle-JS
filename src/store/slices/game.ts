"use client";
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  win: false,
  currentWord: '',
  darkmode: true,
  rowsLeft: 6,
  currentRow: 0,
  //this creates a new object of the alphabet with the letter being the key and their initial value being 'green'.
  letters: Array.from({length: 26}, (_, i) => String.fromCharCode(i + 97))
  .reduce((acc, letter) => ({ 
    ...acc, 
    [letter]: 'green' 
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
      }
    }
  },
})



export const { getDailyWord, saveWord } = game.actions;

//export state properties (if you want to map)

// export const countTest = (state: RootState) => state.game.count;


export default game.reducer;