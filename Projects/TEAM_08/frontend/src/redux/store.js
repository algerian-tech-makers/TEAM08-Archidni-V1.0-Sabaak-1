import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { nextReduxCookieMiddleware } from "next-redux-cookie-wrapper";
import { combinedReducers } from "./reducer";

export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck:false
    }),
  });
export const wrapper = createWrapper(makeStore);
export const useStoreDispatch = () => useDispatch();
export const useStoreSelector = () => useSelector();
