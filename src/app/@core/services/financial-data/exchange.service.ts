import { Injectable } from '@angular/core';
import { Exchange } from '../../classes/financial-data/exchange';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExchangeService {
    private exchangesUrl = '/system/financial-data/exchange';

    constructor (private http: Http) {}

    getExchanges(): Promise<Exchange[]> {
      return this.http.get(this.exchangesUrl)
                 .toPromise()
                 .then(response => response.json() as Exchange[])
                 .catch(this.handleError);
    }

    getExchangesByType(type: String): Promise<Exchange[]> {
      return this.http.get(this.exchangesUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Exchange[])
                 .catch(this.handleError);
    }

    getExchange(exchangeId: String): Promise<Exchange> {
      return this.http.get(this.exchangesUrl + '/' + exchangeId)
                 .toPromise()
                 .then(response => response.json() as Exchange)
                 .catch(this.handleError);
    }

    createExchange(newexchange: Exchange): Promise<Exchange> {
      let data = newexchange;
      return this.http.post(this.exchangesUrl, data)
                 .toPromise()
                 .then(response => response.json() as Exchange)
                 .catch(this.handleError);
    }

    deleteExchange(deleteExchangeId: String): Promise<String> {
      return this.http.delete(this.exchangesUrl + '/' + deleteExchangeId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateExchange(putexchange: Exchange): Promise<Exchange> {
      let putUrl = this.exchangesUrl + '/' + putexchange._id;
      return this.http.put(putUrl, putexchange)
                 .toPromise()
                 .then(response => response.json() as Exchange)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}