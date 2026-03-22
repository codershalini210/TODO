import { Component ,ElementRef,inject,viewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
private formE1 = viewChild<ElementRef<HTMLFormElement>>('form')
constructor(private taskService:TaskService)
{}
onAddTask(title:string,description:string)
{
  this.taskService.addTask({title,description})
  this.formE1()?.nativeElement.reset()
}
}
