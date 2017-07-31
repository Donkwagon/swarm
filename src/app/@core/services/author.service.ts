import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthorService {
    private authorsUrl = '/queen/author';

    constructor (private http: Http) {}

    getAuthors(): Promise<Author[] | void> {
      return this.http.get(this.authorsUrl)
                 .toPromise()
                 .then(response => response.json() as Author[])
                 .catch(this.handleError);
    }

    getAuthorsByType(type: String): Promise<Author[] | void> {
      return this.http.get(this.authorsUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Author[])
                 .catch(this.handleError);
    }

    getAuthor(authorId: String): Promise<Author | void> {
      return this.http.get(this.authorsUrl + '/' + authorId)
                 .toPromise()
                 .then(response => response.json() as Author)
                 .catch(this.handleError);
    }

    createAuthor(newauthor: Author): Promise<Author | void> {
      let data = newauthor;
      return this.http.post(this.authorsUrl, data)
                 .toPromise()
                 .then(response => response.json() as Author)
                 .catch(this.handleError);
    }

    deleteAuthor(deleteAuthorId: String): Promise<String | void> {
      return this.http.delete(this.authorsUrl + '/' + deleteAuthorId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateAuthor(putauthor: Author): Promise<Author | void> {
      let putUrl = this.authorsUrl + '/' + putauthor._id;
      return this.http.put(putUrl, putauthor)
                 .toPromise()
                 .then(response => response.json() as Author)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}