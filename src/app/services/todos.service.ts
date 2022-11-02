import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ITodo, Todo } from '../models/todos.model';

const URL = environment.api.base + environment.api.todos;

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private _http: HttpClient) { }

  getTodos(userId: number): Observable<Todo[]> {
    let query: HttpParams = new HttpParams().append("userId", userId);
    return this._http.get<Todo[]>(URL, { params: query }).pipe(
      map((data: Todo[]) => data.map<Todo>((todo) => { return new Todo(todo) }),
      ))
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this._http.post<ITodo>(URL, todo).pipe(
      map((data: ITodo) => {
        return new Todo(data, true)
      })
    );
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    return this._http.put<ITodo>(URL + `/${todo.id}`, {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
      userId: todo.userId
    }).pipe(
      map((todo: ITodo) => { return new Todo(todo) })
    );
  }
}
