import { Injectable } from '@angular/core';
import { Exchange } from '../../classes/financial-data/exchange';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExchangeService {
    private exchangesUrl = '/system/financial-data/exchange';

    constructor (private http: Http) {}

    getExchanges(): Promise<Exchange[] | void> {
      return this.http.get(this.exchangesUrl)
                 .toPromise()
                 .then(response => response.json() as Exchange[])
                 .catch(this.handleError);
    }

    getNumSecurities(exchange: string): Promise<Number | void> {
      return this.http.get(this.exchangesUrl + "/num-securities/" + exchange)
                 .toPromise()
                 .then(response => response.json() as Number)
                 .catch(this.handleError);
    }


    fetchLatestExchanges(): Promise<any | void> {
      return this.http.get(this.exchangesUrl + "/fetch-lastest-exchanges")
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    getExchangesByType(type: String): Promise<Exchange[] | void> {
      return this.http.get(this.exchangesUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Exchange[])
                 .catch(this.handleError);
    }

    getExchange(exchangeSymbol: String): Promise<Exchange | void> {
      return this.http.get(this.exchangesUrl + '/' + exchangeSymbol)
                 .toPromise()
                 .then(response => response.json() as Exchange)
                 .catch(this.handleError);
    }

    createExchange(newexchange: Exchange): Promise<Exchange | void> {
      let data = newexchange;
      return this.http.post(this.exchangesUrl, data)
                 .toPromise()
                 .then(response => response.json() as Exchange)
                 .catch(this.handleError);
    }

    deleteExchange(deleteExchangeId: String): Promise<String | void> {
      return this.http.delete(this.exchangesUrl + '/' + deleteExchangeId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateExchange(putexchange: Exchange): Promise<Exchange | void> {
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