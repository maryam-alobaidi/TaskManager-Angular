import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  taskService=inject(TaskService);

filter=signal<"all"|"competed"|"active">("all");

filteredTasks=computed(()=>{
  switch(this.filter()){
    case "all":
      return this.taskService.tasks();
    case "competed":
      return this.taskService.completedTask();
    case "active":
      return this.taskService.activeTask();
    default:
    return this.taskService.tasks();
  }
})


setFelter(filter:"all"|"competed"|"active"){
  return this.filter.set(filter);
}

deleteTask(id:number){
  return this.taskService.deleteTask(id);
}

markCompleteTask(id:number){
  return this.taskService.markCompleteTask(id);
}





}
