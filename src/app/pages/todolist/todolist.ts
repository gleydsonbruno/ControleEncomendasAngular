import { Component } from '@angular/core';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}


@Component({
  selector: 'app-todolist',
  imports: [],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})

export class Todolist {
  todoList: TodoItem[] = [];
  newTask: string = '';
}
