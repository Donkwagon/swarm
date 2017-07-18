import { Component, OnInit } from '@angular/core';
import { DatabaseService} from '../@core/services/database.service';

@Component({
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.scss'],
  providers: [ DatabaseService ]
})
export class DatabasePageComponent implements OnInit {

  dbInfo: any;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {

    this.dbService.getNameSpaces().then(res => {
      console.log(res);
      this.dbInfo = res;
    });
  }

}
