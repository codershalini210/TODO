import { Injectable, signal } from '@angular/core';
import { Task ,TaskStatus} from './task.model';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private tasks =signal<Task[]>([])
    alltasks = this.tasks.asReadonly()
    addTask(taskData:{title:string,description:string})
    {
      const newTask:Task={
        ...taskData,id: new Date().toString(),
        status:'OPEN'
      }
      this.tasks.update((oldtasks)=>[...oldtasks,newTask])
    }

   updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) => {
        if (task.id === taskId) {
          console.log(taskId);
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      })
    );
}
}