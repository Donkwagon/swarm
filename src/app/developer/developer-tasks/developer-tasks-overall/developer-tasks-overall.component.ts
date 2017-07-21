import { Component, OnInit } from '@angular/core';

import { Developer } from '../../../@core/classes/developer';
import { DeveloperService } from '../../../@core/shared/developer.service';

import { Task } from '../../../@core/classes/task';
import { TaskService } from '../../../@core/services/task.service';

@Component({
  selector: 'app-developer-tasks-overall',
  templateUrl: './developer-tasks-overall.component.html',
  styleUrls: ['./developer-tasks-overall.component.scss'],
  viewProviders: [ TaskService ]
})
export class DeveloperTasksOverallComponent implements OnInit {

  developer: Developer;

  tasks: Task[];

  constructor(private developerService: DeveloperService, private taskService: TaskService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
    this.tasks = [];
  }

  ngOnInit() {
  }
}
