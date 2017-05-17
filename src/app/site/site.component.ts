import { Component, OnInit } from '@angular/core';

import {SiteService} from './site.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  providers: [SiteService]
})

export class SiteComponent implements OnInit {

  nodes: any[];

  constructor(private siteService:SiteService) {
    this.nodes = [];
   }

  ngOnInit() {
    
  }

  public commenceProbing() {
    this.siteService.commenceProbing().then((res : String[]) => {
      console.log(JSON.stringify(res));
      res.forEach(el =>{
        this.nodes.push(el);
      });
    });
  }
}
