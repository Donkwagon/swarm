import { Injectable } from '@angular/core';
import { Site } from '../classes/site';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SiteService {
    private SitesUrl = '/queen/site';

    constructor (private http: Http) {}
    commenceProbing(): Promise<String[] | void> {
      return this.http.get(this.SitesUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }


    // get("/Site/Sites")
    getSites(): Promise<Site[] | void> {
      return this.http.get(this.SitesUrl)
                 .toPromise()
                 .then(response => response.json() as Site[])
                 .catch(this.handleError);
    }

    // get("/Site/Sites")
    getSitesBySite(name: String): Promise<Site[] | void> {
      return this.http.get(this.SitesUrl + '/site/' + name)
                 .toPromise()
                 .then(response => response.json() as Site[])
                 .catch(this.handleError);
    }

     // get("/Site/Sites/:id")
    getSite(SiteId: String): Promise<Site | void> {
      return this.http.get(this.SitesUrl + '/' + SiteId)
                 .toPromise()
                 .then(response => response.json() as Site)
                 .catch(this.handleError);
    }

    // post("/Site/Sites")
    createSite(newSite: Site): Promise<Site | void> {
      var data = newSite;
      return this.http.post(this.SitesUrl, data)
                 .toPromise()
                 .then(response => response.json() as Site)
                 .catch(this.handleError);
    }

   

    // delete("/Site/Sites/:id")
    deleteSite(delSiteId: String): Promise<String | void> {
      return this.http.delete(this.SitesUrl + '/' + delSiteId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/Site/Sites/:id")
    updateSite(putSite: Site): Promise<Site | void> {
      var putUrl = this.SitesUrl + '/' + putSite._id;
      return this.http.put(putUrl, putSite)
                 .toPromise()
                 .then(response => response.json() as Site)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}