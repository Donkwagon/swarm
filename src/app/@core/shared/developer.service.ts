import { Injectable } from '@angular/core';
import { Developer } from '../classes/developer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class DeveloperService {
    private developersUrl = '/queen/developer';
    public developer: Developer;

    constructor (private http: Http) {
    }

    setDeveloper(developer) {
      this.developer = developer;
    }

    accessDeveloper() {
      return this.developer;
    }

    getDevelopers(): Promise<Developer[]> {
      return this.http.get(this.developersUrl)
                 .toPromise()
                 .then(response => response.json() as Developer[])
                 .catch(this.handleError);
    }

    getDeveloper(developerId: String): Promise<Developer> {
      return this.http.get(this.developersUrl + '/' + developerId)
                 .toPromise()
                 .then(response => response.json() as Developer)
                 .catch(this.handleError);
    }

    createDeveloper(newdeveloper: Developer): Promise<Developer> {
      var data = newdeveloper;
      return this.http.post(this.developersUrl, data)
                 .toPromise()
                 .then(response => response.json() as Developer)
                 .catch(this.handleError);
    }

    deleteDeveloper(deleteDeveloperId: String): Promise<String> {
      return this.http.delete(this.developersUrl + '/' + deleteDeveloperId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateDeveloper(putdeveloper: Developer): Promise<Developer> {
      var putUrl = this.developersUrl + '/' + putdeveloper._id;
      return this.http.put(putUrl, putdeveloper)
                 .toPromise()
                 .then(response => response.json() as Developer)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}