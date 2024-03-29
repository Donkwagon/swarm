import { Component, OnInit } from '@angular/core';

import { Developer } from '../../../@core/classes/developer';
import { DeveloperService } from '../../../@core/shared/developer.service';

import { Task } from '../../../@core/classes/task';
import { TaskService } from '../../../@core/services/task.service';

@Component({
  selector: 'app-developer-new-task',
  templateUrl: './developer-new-task.component.html',
  styleUrls: ['./developer-new-task.component.scss'],
  providers: [ TaskService ]
})
export class DeveloperNewTaskComponent implements OnInit {

  developer: Developer;
  task: Task;

  constructor(private developerService: DeveloperService, private taskService: TaskService) {
    this.developer = new Developer();
  }

  ngOnInit() {
    this.developer = this.developerService.accessDeveloper();
    this.task = new Task(this.developer);
  }

  create() {
    this.taskService.createTask(this.task).then(res => {
      console.log(res);
    });
  }

  discardChanges() {

  }

}
