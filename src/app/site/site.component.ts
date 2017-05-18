import { Component, OnInit } from '@angular/core';

import { SiteService } from './site.service';
import { EntranceService } from '../entrance-list/entrance.service';

import { Entrance } from '../classes/entrance';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  providers: [SiteService,EntranceService]
})

export class SiteComponent implements OnInit {

  nodes: any[];
  entranceList: Entrance[];

  constructor(private siteService:SiteService, private entranceService:EntranceService) {
    this.nodes = [];
    this.entranceList = [];
  }

  ngOnInit() {
    this.getEntranceBySiteName();
  }

  public runTest() {
    this.siteService.runTest().then((res : String[]) => {
      console.log(JSON.stringify(res));
      res.forEach(el =>{
        this.nodes.push(el);
      });
    });
  }

  public commenceProbing() {
    this.siteService.commenceProbing().then((res : String[]) => {
      console.log(JSON.stringify(res));
      res.forEach(el =>{
        this.nodes.push(el);
      });
    });
  }

  public getEntranceBySiteName() {
    this.entranceService.getEntrances().then((entranceList : Entrance[]) => {
      console.log(JSON.stringify(entranceList));
      entranceList.forEach(entrance =>{
        this.entranceList.push(entrance);
      });
    });
  }
}
