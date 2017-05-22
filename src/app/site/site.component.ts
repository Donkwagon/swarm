import { Component, OnInit } from '@angular/core';

import { SiteService } from '../@core/services/site.service';

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

  public runTest() {
    this.siteService.runTest().then((res : String[]) => {
      console.log(JSON.stringify(res));
      if(res.length){
        res.forEach(el =>{
          this.nodes.push(el);
        });
      }
    });
  }

  public commenceProbing() {
    this.siteService.commenceProbing().then((res : String[]) => {
      console.log(JSON.stringify(res));
      if(res.length){
        res.forEach(el =>{
          this.nodes.push(el);
        });
      }
    });
  }
}
