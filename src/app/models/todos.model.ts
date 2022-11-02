export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export class Todo implements ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  fresh: boolean;

  constructor(data: ITodo, fresh: boolean = false) {
    this.userId = data.userId;
    this.id = data.id;
    this.title = data.title;
    this.completed = data.completed;
    this.fresh = fresh;
  }
}
