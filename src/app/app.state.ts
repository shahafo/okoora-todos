import { CoreState } from "./core/state/core.reducers";
import { TodosState } from "./todos/state/todos.reducers";

export interface AppState {
  core: CoreState,
  todos: TodosState
}
