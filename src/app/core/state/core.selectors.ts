import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { CoreState } from "./core.reducers";

export const selectCore = (state: AppState) => state.core;

export const getUser = createSelector(
  selectCore,
  (state: CoreState) => state.user
);

export const getUserInput = createSelector(
  selectCore,
  (state: CoreState) => state.input
);

export const getError = createSelector(
  selectCore,
  (state: CoreState) => state.error
)

export const allall = createSelector(
  selectCore,
  (state: CoreState) => state
)
