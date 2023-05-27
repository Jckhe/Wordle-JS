"use client";
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  rowsLeft: 6,
  //this creates a new object of the alphabet with the letter being the key and their initial value being 'green'.
  letters: Array.from({length: 26}, (_, i) => String.fromCharCode(i + 97))
  .reduce((acc, letter) => ({ 
    ...acc, 
    [letter]: 'green' 
  }), {}),
  
};

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {

  },
})



// export const { saveRecipe, deleteRecipe, syncSavedCards, updateSearchedCards } = game.actions;

//export state properties (if you want to map)

export const countTest = (state: RootState) => state.game.count;


export default game.reducer;