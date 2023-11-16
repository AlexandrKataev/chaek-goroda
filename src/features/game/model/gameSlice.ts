import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';

interface GameState {
  gameStatus: 'won' | 'losed' | 'started' | null;
  playersTurn: boolean;
  currentLetter: string | null;
  namedCities: string[] | null;
}

const initialState: GameState = {
  gameStatus: null,
  playersTurn: true,
  currentLetter: null,
  namedCities: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    start: (state) => {
      state.gameStatus = 'started';
    },
    won: (state) => {
      state.gameStatus = 'won';
    },
    losed: (state) => {
      state.gameStatus = 'losed';
    },
    sendCity: (state, action: PayloadAction<string>) => {
      state.namedCities?.push(action.payload);
    },
  },
});

export const { start, losed, sendCity, won } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameStatus = (state: RootState) => state.game;

export default gameSlice.reducer;
