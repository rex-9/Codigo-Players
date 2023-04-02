import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import joinReducer from "./join";
import playerReducer from "./player";
import teamReducer from "./team";

// Combined reducers
const rootReducer = combineReducers({
  players: playerReducer,
  teams: teamReducer,
  joins: joinReducer,
});

// Redux Store
const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

export default store;
