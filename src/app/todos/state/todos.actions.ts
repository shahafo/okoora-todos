import { createAction, props } from "@ngrx/store";
import { Todo } from "src/app/models/todos.model";

export const loadTodos = createAction('[todos] load todos');
export const loadTodosGood = createAction('[todos] load todos good', props<{ todos: Todo[] }>());
export const loadTodosBad = createAction('[todos] load todos bad', props<{ error: string }>());

export const addTodo = createAction('[todos] add todo', props<{ todo: Todo }>());
export const addTodoGood = createAction('[todos] add todo good', props<{ todo: Todo }>());
export const addTodoBad = createAction('[todos] add todo bad', props<{ error: string }>());

export const toggleStatus = createAction('[todos] toggle status', props<{ todo: Todo }>());
// export const toggleStatusBad = createAction('[tods] toggle status bad', props<{ error: string }>());

export const noUser = createAction('[todos] no user');
