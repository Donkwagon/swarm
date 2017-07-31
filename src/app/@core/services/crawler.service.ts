import { Injectable } from '@angular/core';
import { Crawler } from '../classes/crawler';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrawlerService {
    private CrawlersUrl = '/queen/crawler';

    constructor (private http: Http) {}
    generateBacklog(crawler: Crawler): Promise<any | void> {
      return this.http.post(this.CrawlersUrl + "/generateBacklog", crawler)
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }

    commenceProbing(): Promise<String[] | void> {
      return this.http.get(this.CrawlersUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    // post("/Crawler/Crawlers")
    runCode(crawler: Crawler): Promise<Crawler | void> {
      console.log("data");
      return this.http.post(this.CrawlersUrl + '/run', crawler)
                 .toPromise()
                 .then(response => response.json() as Crawler)
                 .catch(this.handleError);
    }


    // get("/Crawler/Crawlers")
    getCrawlers(): Promise<Crawler[] | void> {
      return this.http.get(this.CrawlersUrl)
                 .toPromise()
                 .then(response => response.json() as Crawler[])
                 .catch(this.handleError);
    }

    // get("/Crawler/Crawlers")
    getCrawlersBySite(siteName: String): Promise<Crawler[] | void> {
      return this.http.get(this.CrawlersUrl + '/site/' + siteName)
                 .toPromise()
                 .then(response => response.json() as Crawler[])
                 .catch(this.handleError);
    }

     // get("/Crawler/Crawlers/:id")
    getCrawler(CrawlerId: String): Promise<Crawler | void> {
      return this.http.get(this.CrawlersUrl + '/' + CrawlerId)
                 .toPromise()
                 .then(response => response.json() as Crawler)
                 .catch(this.handleError);
    }

    // post("/Crawler/Crawlers")
    createCrawler(newCrawler: Crawler): Promise<Crawler | void> {
      var data = newCrawler;
      return this.http.post(this.CrawlersUrl, data)
                 .toPromise()
                 .then(response => response.json() as Crawler)
                 .catch(this.handleError);
    }

   

    // delete("/Crawler/Crawlers/:id")
    deleteCrawler(delCrawlerId: String): Promise<String | void> {
      return this.http.delete(this.CrawlersUrl + '/' + delCrawlerId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/Crawler/Crawlers/:id")
    updateCrawler(putCrawler: Crawler): Promise<Crawler | void> {
      var putUrl = this.CrawlersUrl + '/' + putCrawler._id;
      return this.http.put(putUrl, putCrawler)
                 .toPromise()
                 .then(response => response.json() as Crawler)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}