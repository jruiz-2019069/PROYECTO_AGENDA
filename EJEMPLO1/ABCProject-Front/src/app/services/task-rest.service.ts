import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(
    public http: HttpClient
  ) { }

  addTask(params: {}){
    return this.http.post(environment.baseUrl + "task/addTask", params, {headers: this.httpOptions});
  }

  getTasks(){
    return this.http.get(environment.baseUrl + "task/getTasks", {headers: this.httpOptions});
  }

  getTask(idTask: any){
    return this.http.get(environment.baseUrl + "task/getTask/" + idTask, {headers: this.httpOptions});
  }

  updateTask(idTask: any, params: {}){
    return this.http.put(environment.baseUrl + "task/updateTask/" + idTask, params,{headers: this.httpOptions});
  }

  deleteTask(idTask: any){
    return this.http.delete(environment.baseUrl + "task/deleteTask/" + idTask, {headers: this.httpOptions});
  }
}
