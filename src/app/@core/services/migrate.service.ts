import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MigrateService {
    private securitiesUrl = '/apis/m';

    constructor (private http: Http) {}

    migrateUsers(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/users")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }


    migrateRelationships(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/relationships")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migrateComments(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/posts")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migratePosts(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/comments")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migrateCompanies(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/companies")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migrateSectors(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/sectors")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migrateIndustries(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/industries")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migrateUserInfo(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/user-info")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    migrateUsersClosedPost(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/user-closed-posts")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }


    migrateUsersHoldings(): Promise<any> {
      return this.http.get(this.securitiesUrl + "/user-holdings")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }


    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}