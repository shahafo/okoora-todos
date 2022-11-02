import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getError, getUser } from 'src/app/core/state/core.selectors';
import { Todo } from 'src/app/models/todos.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { TodosService } from 'src/app/services/todos.service';
import * as todosActions from './todos.actions';
import { getTodoError, getTodos } from './todos.selectors';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private _todosService: TodosService,
    private router: Router,
    private _alerts: AlertsService
  ) { }

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.loadTodos),
      withLatestFrom(this.store.select(getUser)),
      switchMap(([action, user]) => from(this._todosService.getTodos(user?.id || 0)).pipe(
        map((todos: Todo[]) => todosActions.loadTodosGood({ todos: todos })),
        catchError(() => of(todosActions.loadTodosBad({ error: "Problem with loading todos" })))
      )))
  )

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.addTodo),
      switchMap(action => from(this._todosService.addTodo(action.todo)).pipe(
        map((todo: Todo) => {
          this._alerts.popAlert("Added new todo.", "good");
          return todosActions.addTodoGood({ todo: todo });
        }),
        catchError(() => of(todosActions.addTodoBad({ error: "Problem with adding new todo" })))
      )))
  )

  toggleStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.toggleStatus),
      withLatestFrom(this.store.select(getTodos)),
      switchMap(([action, todos]) => from(this._todosService.toggleTodo(action.todo).pipe(
        map((todo: Todo) => {
          let newTodos: Todo[] = [];
          todos.forEach(item => newTodos.push(Object.assign({}, item)));
          let i: number = newTodos.findIndex(item => item.id == todo.id);
          newTodos[i].completed = !newTodos[i].completed;
          return todosActions.loadTodosGood({ todos: newTodos });
        }),
        catchError(() => of(todosActions.loadTodosBad({ error: "Problem with loading todos" })))
      )))
    )
  )

  loadTodosBad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.loadTodosBad),
      withLatestFrom(this.store.select(getError)),
      tap(([action, error]) => this._alerts.popAlert(error, "warning"))
    ),
    { dispatch: false }
  )

  addTodoBad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.addTodoBad),
      withLatestFrom(this.store.select(getTodoError)),
      tap(([action, error]) => this._alerts.popAlert(error, "warning"))
    ),
    { dispatch: false }
  )

  noUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.noUser),
      tap(() => {
        this._alerts.popAlert("You need to be logged in", "warning");
        this.router.navigate(['/']);
      })),
    { dispatch: false }
  )

}
