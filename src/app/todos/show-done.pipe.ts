import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todos.model';

@Pipe({
  name: 'showDone'
})
export class ShowDonePipe implements PipeTransform {

  transform(todos: Todo[] | null, show: boolean): Todo[] | null {
    if (!show && todos) return todos.filter((todo: Todo) => todo.completed === false);
    return todos;
  }

}
