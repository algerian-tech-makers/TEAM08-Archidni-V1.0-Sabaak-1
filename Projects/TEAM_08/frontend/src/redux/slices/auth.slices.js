import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { api } from "utils/api";

const initialState = {
  token: null,
  isLoggedIn: false,
  me: null,
  isLoading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    signup: (state, { payload }) => {
      // state.me = payload.user;
      state.isLoggedIn = true;
      state.token = payload.token;
    },
    login: (state, { payload }) => {
      //  state.me = payload.user;
      state.isLoggedIn = true;
      state.token = payload.token;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.auth,
    }),
  },
});
export const { signup, login, startLoading, hasError } = authSlice.actions;

export const signupAction = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await api
      .post("/auth/signup", data)
      .then((response) => dispatch(signup(response.data)));
  } catch (e) {
    dispatch(hasError(e));
  }
};
export const loginAction = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await api
      .post("/auth/login", data)
      .then((response) => dispatch(login(response.data)));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export default authSlice.reducer;
