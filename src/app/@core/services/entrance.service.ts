import { Injectable } from '@angular/core';
import { Entrance } from '../classes/entrance';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntranceService {
    private entrancesUrl = '/queen/entrance';

    constructor (private http: Http) {}
    commenceProbing(): Promise<String[]> {
      return this.http.get(this.entrancesUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }


    // get("/entrance/entrances")
    getEntrances(): Promise<Entrance[]> {
      return this.http.get(this.entrancesUrl)
                 .toPromise()
                 .then(response => response.json() as Entrance[])
                 .catch(this.handleError);
    }

    // get("/entrance/entrances")
    getEntrancesBySite(siteName: String): Promise<Entrance[]> {
      return this.http.get(this.entrancesUrl + '/site/' + siteName)
                 .toPromise()
                 .then(response => response.json() as Entrance[])
                 .catch(this.handleError);
    }

     // get("/entrance/entrances/:id")
    getEntrance(entranceId: String): Promise<Entrance> {
      return this.http.get(this.entrancesUrl + '/' + entranceId)
                 .toPromise()
                 .then(response => response.json() as Entrance)
                 .catch(this.handleError);
    }

    // post("/entrance/entrances")
    createEntrance(newentrance: Entrance): Promise<Entrance> {
      var data = newentrance;
      return this.http.post(this.entrancesUrl, data)
                 .toPromise()
                 .then(response => response.json() as Entrance)
                 .catch(this.handleError);
    }

   

    // delete("/entrance/entrances/:id")
    deleteEntrance(delentranceId: String): Promise<String> {
      return this.http.delete(this.entrancesUrl + '/' + delentranceId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/entrance/entrances/:id")
    updatEntrance(putentrance: Entrance): Promise<Entrance> {
      var putUrl = this.entrancesUrl + '/' + putentrance._id;
      return this.http.put(putUrl, putentrance)
                 .toPromise()
                 .then(response => response.json() as Entrance)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}