import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { TodosState } from "./todos.reducers";

export const selectTodos = (state: AppState) => state.todos;

export const getTodos = createSelector(
  selectTodos,
  (state: TodosState) => state.todos
)

export const getCounter = createSelector(
  selectTodos,
  (state: TodosState) => state.todos.length
)

export const getTodoError = createSelector(
  selectTodos,
  (state: TodosState) => state.error
)
