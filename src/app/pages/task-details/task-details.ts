import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  //inject the service ..
taskServices=inject(TaskService);

//
route=inject(ActivatedRoute);
taskId=signal<number|null>(null);


constructor(){
  const id=this.route.snapshot.paramMap.get('id');

  if(id){
    this.taskId.set(+id);//de string a number
  }
}

task=computed(()=>{
  const id=this.taskId();
  if(!id){
    return undefined;
  }
  return this.taskServices.getTask(id);
})




}
