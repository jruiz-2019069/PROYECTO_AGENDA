import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TaskModel } from './models/task.model';
import { TaskRestService } from './services/task-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  //Instancia del modelo de la tarea
  task: TaskModel;

  //Arreglo de tareas
  arrayTasks: any = [];

  //Task a actualizar
  taskUpdate = {
   _id: "",
   title: "",
   description: "",
   priority: 0,
   complete: false
  }

  constructor(
    public taskRest: TaskRestService
  ){
    this.task = new TaskModel("", "", "", 0, false);
  }

  ngOnInit(): void {
    this.getTasks(); 
  }

  getTasks(){
    this.taskRest.getTasks().subscribe({
      next: (res: any) => {
        this.arrayTasks = res.tasks;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addTask(ngForm: any){
    this.taskRest.addTask(this.task).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success',  
                    title: res.message,
                    timer: 2000
                  })
        this.getTasks();
        ngForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });  
  }

  getTask(idTask: any){
    this.taskRest.getTask(idTask).subscribe({
      next: (res: any) => {
        this.taskUpdate.title = res.task.title;
        this.taskUpdate.description = res.task.description;
        this.taskUpdate.priority = res.task.priority;
        this.taskUpdate.complete = res.task.complete;
        this.taskUpdate._id = res.task._id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateTask(){
    this.taskRest.updateTask(this.taskUpdate._id, this.taskUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success',  
                    title: res.message,
                    timer: 2000
                  })
        this.getTasks();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteTask(){
    this.taskRest.deleteTask(this.taskUpdate._id).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success',  
                    title: res.message,
                    timer: 2000
                  })
        this.getTasks();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
