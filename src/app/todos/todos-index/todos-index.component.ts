import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loadUser } from 'src/app/core/state/core.actions';
import { getUser } from 'src/app/core/state/core.selectors';
import { Todo } from 'src/app/models/todos.model';
import { IUser } from 'src/app/models/user.model';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { addTodo, addTodoBad, loadTodos, noUser } from '../state/todos.actions';
import { getCounter, getTodos } from '../state/todos.selectors';

@Component({
  selector: 'app-todos-index',
  templateUrl: './todos-index.component.html',
  styleUrls: ['./todos-index.component.scss']
})
export class TodosIndexComponent implements OnInit, OnDestroy {
  SUBS: any[] = [];

  todos$ = this.store.select(getTodos);
  showCount: number = 5;
  showDone: boolean = true;
  userId: number;
  counter: number;

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.SUBS.push(
      this.store.select(getUser).subscribe((user: IUser | null) => {
        if (!user) this.store.dispatch(noUser());
        if (user) this.userId = user.id;
      })
    );
    this.SUBS.push(
      this.store.select(getCounter).subscribe((counter: number) => {
        this.counter = counter;
      })
    );
  }


  addTodo() {
    const d = this.dialog.open(AddDialogComponent, {
      width: "300px",
      data: new Todo({
        userId: this.userId,
        id: this.counter + 1,
        title: "",
        completed: false
      })
    });

    this.SUBS.push(
      d.afterClosed().subscribe((value: Todo) => {
        if (value.title.length > 0) {
          this.store.dispatch(addTodo({ todo: value }));
          return;
        }
        this.store.dispatch(addTodoBad({ error: "Empty todo cannot be added" }));
      })
    )
  }

  ngOnDestroy(): void {
    this.SUBS.forEach(sub => sub.unsubscribe());
  }
}
