import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Todo } from 'src/app/models/todos.model';
import { toggleStatus } from '../state/todos.actions';

@Component({
  selector: 'todoItem',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() data: Todo;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggleStatus(): void {
    this.store.dispatch(toggleStatus({ todo: this.data }));
  }

}
