import { computed, effect, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Data } from '@angular/router';

export interface Task{
  id:number,
  title:string,
  description:string,
  completed:boolean,
  createdAt: Date,
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
   private storgeKey="my-task";//the key in local storage

   private taskSignal=signal<Task[]>(this.loadTasks());

   constructor(){
    effect(()=>{
    localStorage.setItem(this.storgeKey,JSON.stringify(this.taskSignal()))
    })
   }

   //load from local storage
    loadTasks():Task[]{
    const savedTasks=localStorage.getItem(this.storgeKey);
    if(savedTasks){
      const tasks=JSON.parse(savedTasks);
      return tasks.map((t:any)=>({...t,createdAt:new Date(t.createdAt)}));
    }
    return [];
    }


  tasks=this.taskSignal.asReadonly();
  
  completedTask=computed(()=>{
   return this.taskSignal().filter((t)=>t.completed)
  })

    activeTask=computed(()=>{
   return this.taskSignal().filter((t)=>!t.completed)
  })

  getTask(id:number){
    return this.tasks().find(t=>t.id===id);
  }

  addTask(title:string,description:string){
    const task={
      id:this.taskSignal().length+1,
      title,
      description,
      completed:false,
      createdAt:new Date(),
    }

    this.taskSignal.update(tasks=>[...tasks,task])
  }

  deleteTask(id: number): void {
  this.taskSignal.update((tasks) => tasks.filter(task => task.id !== id));
  }

  markCompleteTask(id:number):void{
  this.taskSignal.update((tasks) => tasks.map(task => task.id === id? {...task,completed:!task.completed}:task));
 
  }

}
