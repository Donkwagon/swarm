import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseService {
    private DatabaseUrl = '/system/database';

    constructor (private http: Http) {}


    // get("/Site/Sites")
    getNameSpaces(): Promise<any[] | void> {
      return this.http.get(this.DatabaseUrl)
                 .toPromise()
                 .then(response => response.json() as any[])
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}