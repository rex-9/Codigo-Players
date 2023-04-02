import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpoint, fetchData } from "../services/api";

const FETCH_PLAYERS = "Codigo-State-Management/player/FETCH_PLAYERS";

const initialState = [];

// Player Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_PLAYERS}/fulfilled`:
      return [...action.payload];

    default:
      return state;
  }
};

// Action Creators
// Fetch Players from api
export const fetchPlayers = createAsyncThunk(
  FETCH_PLAYERS,
  async (currentPage) => {
    const response = await fetchData(endpoint(currentPage));
    const data = response.data;

    const players = data.map((player) => ({
      id: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      height_feet: player.height_feet,
      height_inches: player.height_inches,
      position: player.position,
      weight_pounds: player.weight_pounds,
    }));

    return players;
  }
);
