import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewTask } from './task/new-task/new-task';
import { TasksList } from './task/tasks-list/tasks-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NewTask,TasksList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TODO');
}
