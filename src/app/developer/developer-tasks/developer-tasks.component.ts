import { Component, OnInit } from '@angular/core';
import { Developer } from '../../@core/classes/developer';
import { DeveloperService } from '../../@core/shared/developer.service';

@Component({
  selector: 'app-developer-tasks',
  templateUrl: './developer-tasks.component.html',
  styleUrls: ['./developer-tasks.component.scss']
})
export class DeveloperTasksComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }

}
