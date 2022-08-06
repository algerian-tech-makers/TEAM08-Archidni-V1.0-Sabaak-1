import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import authReducer from "./slices/auth.slices";

export const combinedReducers = combineReducers({
  auth: authReducer,

});
const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default rootReducer;
