import { Injectable } from '@angular/core';
import { Task } from '../classes/task';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    private TasksUrl = '/facility/task';

    constructor (private http: Http) {}
    commenceProbing(): Promise<String[] | void> {
      return this.http.get(this.TasksUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }


    // get("/Task/Tasks")
    getTasks(): Promise<Task[] | void> {
      return this.http.get(this.TasksUrl)
                 .toPromise()
                 .then(response => response.json() as Task[])
                 .catch(this.handleError);
    }

    getTasksByType(complete: Boolean): Promise<Task[] | void> {
      return this.http.get(this.TasksUrl + '/type/' + complete)
                 .toPromise()
                 .then(response => response.json() as Task[])
                 .catch(this.handleError);
    }

     // get("/Task/Tasks/:id")
    getTask(TaskId: String): Promise<Task | void> {
      return this.http.get(this.TasksUrl + '/' + TaskId)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

    // post("/Task/Tasks")
    createTask(newTask: Task): Promise<Task | void> {
      var data = newTask;
      return this.http.post(this.TasksUrl, data)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

   

    // delete("/Task/Tasks/:id")
    deleteTask(delTaskId: String): Promise<String | void> {
      return this.http.delete(this.TasksUrl + '/' + delTaskId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/Task/Tasks/:id")
    updateTask(putTask: Task): Promise<Task | void> {
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