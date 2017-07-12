import { Component, OnInit } from '@angular/core';
import { Developer } from '../../@core/classes/developer';
import { DeveloperService } from '../../@core/shared/developer.service';

@Component({
  selector: 'app-developer-inbox',
  templateUrl: './developer-inbox.component.html',
  styleUrls: ['./developer-inbox.component.scss']
})
export class DeveloperInboxComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }

}
