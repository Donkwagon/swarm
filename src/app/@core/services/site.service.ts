import { Injectable } from '@angular/core';
import { Site } from '../classes/site';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SiteService {
    private sitesUrl = '/queen/SA';

    constructor (private http: Http) {}
    runTest(): Promise<String[]> {
      return this.http.get('/queen/test')
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }
    crawlAuthors(): Promise<String[]> {
      return this.http.get('/queen/test/author')
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    crawlArticles(): Promise<String[]> {
      return this.http.get('/queen/test/article')
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    commenceProbing(): Promise<String[]> {
      return this.http.get(this.sitesUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }


    // get("/site/sites")
    getSites(): Promise<Site[]> {
      return this.http.get(this.sitesUrl)
                 .toPromise()
                 .then(response => response.json() as Site[])
                 .catch(this.handleError);
    }

    // get("/site/sites")
    getSitesByStatus(status: String): Promise<Site[]> {
      return this.http.get(this.sitesUrl + '/status/' + status)
                 .toPromise()
                 .then(response => response.json() as Site[])
                 .catch(this.handleError);
    }

     // get("/site/sites/:id")
    getsite(siteId: String): Promise<Site> {
      return this.http.get(this.sitesUrl + '/' + siteId)
                 .toPromise()
                 .then(response => response.json() as Site)
                 .catch(this.handleError);
    }

    // post("/site/sites")
    createSite(newsite: Site): Promise<Site> {
      var data = newsite;
      return this.http.post(this.sitesUrl, data)
                 .toPromise()
                 .then(response => response.json() as Site)
                 .catch(this.handleError);
    }

   

    // delete("/site/sites/:id")
    deleteSite(delsiteId: String): Promise<String> {
      return this.http.delete(this.sitesUrl + '/' + delsiteId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/site/sites/:id")
    updateSite(putsite: Site): Promise<Site> {
      var putUrl = this.sitesUrl + '/' + putsite._id;
      return this.http.put(putUrl, putsite)
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