import { Injectable } from '@angular/core';
import { Security } from '../../classes/financial-data/security';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SecurityService {
    private securitiesUrl = '/system/financial-data/security';

    constructor (private http: Http) {}

    getSecurities(): Promise<Security[]> {
      return this.http.get(this.securitiesUrl)
                 .toPromise()
                 .then(response => response.json() as Security[])
                 .catch(this.handleError);
    }

    getSecuritiesByExchange(exchange: string): Promise<Security[]> {
      return this.http.get(this.securitiesUrl + '/exchange/' + exchange)
                 .toPromise()
                 .then(response => response.json() as Security[])
                 .catch(this.handleError);
    }

    getSecurity(securityId: String): Promise<Security> {
      return this.http.get(this.securitiesUrl + '/' + securityId)
                 .toPromise()
                 .then(response => response.json() as Security)
                 .catch(this.handleError);
    }

    createSecurity(newsecurity: Security): Promise<Security> {
      let data = newsecurity;
      return this.http.post(this.securitiesUrl, data)
                 .toPromise()
                 .then(response => response.json() as Security)
                 .catch(this.handleError);
    }

    deleteSecurity(deleteSecurityId: String): Promise<String> {
      return this.http.delete(this.securitiesUrl + '/' + deleteSecurityId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateSecurity(putsecurity: Security): Promise<Security> {
      let putUrl = this.securitiesUrl + '/' + putsecurity._id;
      return this.http.put(putUrl, putsecurity)
                 .toPromise()
                 .then(response => response.json() as Security)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}