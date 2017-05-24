import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../@core/services/author.service';
import { Author } from '../../@core/classes/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  providers: [AuthorService]
})
export class AuthorsComponent implements OnInit {

  authors: Author[];

  constructor(private authorService: AuthorService) {
    this.authors = [];
  }

  ngOnInit() {
    this.getAuthorList();
  }

  public getAuthorList() {
    this.authorService.getAuthors().then((authorList : Author[]) => {
      authorList.forEach(author =>{
        this.authors.push(author);
      });
    });
  }

}
