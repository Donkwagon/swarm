import { Injectable } from '@angular/core';
import { Backlog } from '../classes/backlog';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BacklogService {
    private backlogsUrl = '/queen/backlog';

    constructor (private http: Http) {}

    // get("/backlog/backlogs")
    getbacklogs(): Promise<Backlog[]> {
      return this.http.get(this.backlogsUrl)
                 .toPromise()
                 .then(response => response.json() as Backlog[])
                 .catch(this.handleError);
    }

    archiveBacklogs(): Promise<any> {
      return this.http.get(this.backlogsUrl + "/archive")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }


    typecleaning(): Promise<any> {
      return this.http.get(this.backlogsUrl + "/typecleaning")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }


    generate(): Promise<any> {
      return this.http.get(this.backlogsUrl + "/generate")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    // get("/backlog/backlogs")
    getbacklogsByType(type: String): Promise<Backlog[]> {
      return this.http.get(this.backlogsUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Backlog[])
                 .catch(this.handleError);
    }

     // get("/backlog/backlogs/:id")
    getbacklog(backlogId: String): Promise<Backlog> {
      return this.http.get(this.backlogsUrl + '/' + backlogId)
                 .toPromise()
                 .then(response => response.json() as Backlog)
                 .catch(this.handleError);
    }

    // post("/backlog/backlogs")
    creatEbacklog(newbacklog: Backlog): Promise<Backlog> {
      var data = newbacklog;
      return this.http.post(this.backlogsUrl, data)
                 .toPromise()
                 .then(response => response.json() as Backlog)
                 .catch(this.handleError);
    }

   

    // delete("/backlog/backlogs/:id")
    deletEbacklog(delbacklogId: String): Promise<String> {
      return this.http.delete(this.backlogsUrl + '/' + delbacklogId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/backlog/backlogs/:id")
    updatbacklog(putbacklog: Backlog): Promise<Backlog> {
      var putUrl = this.backlogsUrl + '/' + putbacklog._id;
      return this.http.put(putUrl, putbacklog)
                 .toPromise()
                 .then(response => response.json() as Backlog)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}