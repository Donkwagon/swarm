import { Component, OnInit } from '@angular/core';

import { Developer } from '../../@core/classes/developer';
import { DeveloperService } from '../../@core/shared/developer.service';

import { Task } from '../../@core/classes/task';
import { TaskService } from '../../@core/services/task.service';

@Component({
  selector: 'app-developer-tasks',
  templateUrl: './developer-tasks.component.html',
  styleUrls: ['./developer-tasks.component.scss'],
  viewProviders: [ TaskService ]
})

export class DeveloperTasksComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService, private taskService: TaskService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }
}
