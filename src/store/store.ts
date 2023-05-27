import { configureStore } from '@reduxjs/toolkit';
import game from './slices/game';


const store = configureStore({
  reducer: {
    game,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;