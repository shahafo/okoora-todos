import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/app/models/todos.model";
import * as Actions from "./todos.actions";


export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string;
  input: Todo | null;

}

export const initialState: TodosState = {
  todos: [],
  loading: false,
  error: "",
  input: null
}

export const todosReducer = createReducer(
  initialState,
  on(Actions.addTodo, (state, { todo }) => ({
    ...state,
    loading: true,
    input: todo
  })),
  on(Actions.addTodoGood, (state, { todo }) => ({
    ...state,
    loading: false,
    todos: [...state.todos, todo],
    input: null,
    error: ""
  })),
  on(Actions.addTodoBad, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(Actions.loadTodos, (state) => ({
    ...state,
    loading: true
  })),
  on(Actions.loadTodosGood, (state, { todos }) => ({
    ...state,
    todos: todos,
    loading: false
  })),
  on(Actions.loadTodosBad, (state, { error }) => ({
    ...state,
    error: error,
    loading: false
  }))
)
