import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private router=inject(Router);
   taskService=inject(TaskService);
   private fb=inject(FormBuilder);

   taskForm=this.fb.group({
    title:["",[Validators.required,Validators.minLength(3)]],
    description:["",[Validators.required,Validators.minLength(8)]],
   })

   onSubmit(){
    if(this.taskForm.valid){
      const {title,description}=this.taskForm.value;
      this.taskService.addTask(title!,description!);
      this.router.navigate(['/']);
    }
   }
 

}
