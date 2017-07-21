import { Injectable } from '@angular/core';
import { Task } from '../classes/task';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    private TasksUrl = '/queen/task';

    constructor (private http: Http) {}
    commenceProbing(): Promise<String[]> {
      return this.http.get(this.TasksUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }


    // get("/Task/Tasks")
    getTasks(): Promise<Task[]> {
      return this.http.get(this.TasksUrl)
                 .toPromise()
                 .then(response => response.json() as Task[])
                 .catch(this.handleError);
    }

    // get("/Task/Tasks")
    getTasksByTask(name: String): Promise<Task[]> {
      return this.http.get(this.TasksUrl + '/task/' + name)
                 .toPromise()
                 .then(response => response.json() as Task[])
                 .catch(this.handleError);
    }

     // get("/Task/Tasks/:id")
    getTask(TaskId: String): Promise<Task> {
      return this.http.get(this.TasksUrl + '/' + TaskId)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

    // post("/Task/Tasks")
    createTask(newTask: Task): Promise<Task> {
      var data = newTask;
      return this.http.post(this.TasksUrl, data)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

   

    // delete("/Task/Tasks/:id")
    deleteTask(delTaskId: String): Promise<String> {
      return this.http.delete(this.TasksUrl + '/' + delTaskId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/Task/Tasks/:id")
    updateTask(putTask: Task): Promise<Task> {
      var putUrl = this.TasksUrl + '/' + putTask._id;
      return this.http.put(putUrl, putTask)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}