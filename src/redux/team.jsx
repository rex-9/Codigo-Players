import { getCookie, setCookie } from "../services/cookie";

const FETCH_TEAM = "Codigo-State-Management/player/FETCH_TEAM";
const CREATE_TEAM = "Codigo-State-Management/player/CREATE_TEAM";
const DELETE_TEAM = "Codigo-State-Management/player/DELETE_TEAM";
const UPDATE_TEAM = "Codigo-State-Management/player/UPDATE_TEAM";

const initialState = [];

// Team reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAM:
      return [...action.payload];

    case CREATE_TEAM:
      setCookie("teams", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case UPDATE_TEAM:
      const team = state.find((team) => team.id === action.payload.id);
      team.name = action.payload.name;
      team.region = action.payload.region;
      team.country = action.payload.country;
      team.player_count = action.payload.player_count;
      setCookie("teams", JSON.stringify([...state]));
      return [...state];

    case DELETE_TEAM:
      const filteredTeams = state.filter((team) => team.id !== action.payload);
      setCookie("teams", JSON.stringify([...filteredTeams]));
      return filteredTeams;

    default:
      return state;
  }
};

// Action creators
// Create a team
export const fetchTeams = () => ({
  type: FETCH_TEAM,
  payload: JSON.parse(getCookie("teams")),
});

// Create a team
export const createTeam = (team) => ({
  type: CREATE_TEAM,
  payload: team,
});

// Update a team
export const updateTeam = (team) => ({
  type: UPDATE_TEAM,
  payload: team,
});

// Delete a team
export const deleteTeam = (id) => ({
  type: DELETE_TEAM,
  payload: id,
});
