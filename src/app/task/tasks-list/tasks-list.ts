import { Component,computed,inject,signal } from '@angular/core';
import { TaskStatusOptions } from '../task.model';
import { TaskItem } from './task-item/task-item';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tasks-list',
  imports: [TaskItem,CommonModule],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  taskStatusOptions =TaskStatusOptions
private  taskService = inject(TaskService)
private selectedFilter =signal<string>('all')
tasks=computed(()=>
{
  switch (this.selectedFilter()) {
      case 'all':
        return this.taskService.alltasks();
      case 'open':
        return this.taskService.alltasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .alltasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
          .alltasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.taskService.alltasks();
  }
})

onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
trackByOptionValue(index: number, option: any): string {
  return option.value;
}

// For tasks list
// trackByTask(index: number, task: any): string | number {
//   return task.id; // assuming each task has a unique id
// }
}
