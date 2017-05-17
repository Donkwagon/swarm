import { Component, OnInit } from '@angular/core';

import {SiteService} from './site.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  providers: [SiteService]
})

export class SiteComponent implements OnInit {

  logs: String[];

  constructor(private siteService:SiteService) {
    this.logs = [];
   }

  ngOnInit() {
    
  }

  public commenceProbing() {
    this.siteService.commenceProbing().then((res : String[]) => {
      console.log(JSON.stringify(res));
      res.forEach(el =>{
        this.logs.push(el);
      });
    });
  }
}
