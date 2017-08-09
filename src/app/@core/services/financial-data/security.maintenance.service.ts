import { Injectable } from '@angular/core';
import { Security } from '../../classes/financial-data/security';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SecurityMaintenanceService {
    private securitiesUrl = '/system/financial-data/security-maintenance';

    constructor (private http: Http) {}

    updateIEXListing(): Promise < any > {
      return this.http.get(this.securitiesUrl + "/IEX-listing")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    getIEXData(): Promise < any > {
      return this.http.get(this.securitiesUrl + "/IEX-data/symbol/AMD")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    getAllIEXListedData(): Promise < any > {
      return this.http.get(this.securitiesUrl + "/IEX-data/all")
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