import { createReducer, on } from "@ngrx/store";
import { IUser } from "src/app/models/user.model";
import * as Actions from "./core.actions";

export interface CoreState {
  loading: boolean;
  user: IUser | null;
  error: string;
  input: string;
}

export const initialState: CoreState = {
  loading: false,
  user: null,
  error: "",
  input: ""
}

export const coreReducer = createReducer(
  initialState,
  on(Actions.loadUser, (state, { username }) => ({
    ...state,
    loading: true,
    input: username
  })),
  on(Actions.loadUserGood, (state, { user }) => ({
    ...state,
    loading: false,
    user: user,
    error: "",
    input: ""
  })),
  on(Actions.loadUserBad, (state, { error }) => ({
    ...state,
    loading: false,
    user: null,
    error: error
  }))
);

