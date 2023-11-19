import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/redux/store';
import { citiesData } from '@shared/data/cities';

interface GameState {
  gameStatus: 'won' | 'losed' | 'started' | null;
  isPlayersTurn: boolean;
  currentLetter: string | null;
  lastNamedCity: string | null;
  namedCities: string[];
  notNamedCities: string[];
}

const initialState: GameState = {
  gameStatus: null,
  isPlayersTurn: true,
  currentLetter: null,
  lastNamedCity: null,
  namedCities: [],
  notNamedCities: citiesData,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    start: (_state) => {
      return (_state = { ...initialState, gameStatus: 'started' });
    },

    won: (state) => {
      state.gameStatus = 'won';
    },
    losed: (state) => {
      state.gameStatus = 'losed';
    },
    sendCity: (state, action: PayloadAction<string>) => {
      state.namedCities.push(action.payload);
      state.isPlayersTurn = !state.isPlayersTurn;
      state.lastNamedCity = action.payload;
      state.notNamedCities = state.notNamedCities.filter(
        (el) => el.toLowerCase() !== action.payload.toLowerCase(),
      );
    },
  },
});

export const { start, losed, sendCity, won } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectNamedCities = (state: RootState) => state.game.namedCities;
export const selectIsPlayersTurn = (state: RootState) => state.game.isPlayersTurn;
export const selectLastNamedCity = (state: RootState) => state.game.lastNamedCity;
export const selectNotNamedCities = (state: RootState) => state.game.notNamedCities;

export default gameSlice.reducer;
