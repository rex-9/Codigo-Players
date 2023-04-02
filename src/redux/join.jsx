import { getCookie, setCookie } from "../services/cookie";
const FETCH_JOIN = "Codigo-State-Management/player/FETCH_JOIN";
const ASSIGN = "Codigo-State-Management/player/ASSIGN";
const DEASSIGN = "Codigo-State-Management/player/DEASSIGN";
const DELETE_TEAM = "Codigo-State-Management/player/DELETE_TEAM";

const initialState = [];

// Team reducer for assigning the player into the team.
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOIN:
      return [...action.payload];

    case ASSIGN:
      setCookie("joins", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case DEASSIGN:
      const filteredPlayer = state.filter(
        (join) => join.playerId !== action.payload
      );
      setCookie("joins", JSON.stringify([...filteredPlayer]));
      return filteredPlayer;

    case DELETE_TEAM:
      const filteredTeam = state.filter(
        (join) => join.teamId !== action.payload
      );
      setCookie("joins", JSON.stringify([...filteredTeam]));
      return filteredTeam;

    default:
      return state;
  }
};

// Action creators
export const fetchJoins = () => ({
  type: FETCH_JOIN,
  payload: JSON.parse(getCookie("joins")),
});

export const createJoin = (join) => ({
  type: ASSIGN,
  payload: join,
});

export const removeJoin = (join) => ({
  type: DEASSIGN,
  payload: join,
});

export const removeJoins = (join) => ({
  type: DELETE_TEAM,
  payload: join,
});
