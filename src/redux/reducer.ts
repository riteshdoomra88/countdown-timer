// import regionSlice from './slices/regionSlice';
import { combineReducers } from "@reduxjs/toolkit";
import utilities from "./slices/utilities";
import timerSlice from "./slices/timerSlice";

const reducers = {
  utilities,
  timerSlice,
};

function createRootReducer(injectedReducers = {}) {
  return combineReducers({
    ...injectedReducers,
    ...reducers,
  });
}

export { createRootReducer };
