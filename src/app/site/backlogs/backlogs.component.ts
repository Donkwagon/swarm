import { Component, OnInit } from '@angular/core';

import { Backlog } from "../../@core/classes/backlog";
import { BacklogService } from "../../@core/services/backlog.service";

@Component({
  selector: 'app-backlogs',
  templateUrl: './backlogs.component.html',
  styleUrls: ['./backlogs.component.scss'],
  providers: [BacklogService]
})

export class BacklogsComponent implements OnInit {

  backlogs: Backlog[];
  currentType: String;

  constructor(private backlogService:BacklogService) {
    this.backlogs = [];
  }

  ngOnInit() {
    this.getBacklogs('author');
  }

  public getBacklogs = (type: String) =>{
    this.currentType = type;
    this.backlogs = [];
    this.backlogService.getbacklogsByType(type).then((backlogs : Backlog[]) => {
      console.log(backlogs);
      backlogs.forEach(backlog =>{
        this.backlogs.push(backlog);
      });
    });
  }
}
