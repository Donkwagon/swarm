import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Developer } from '../../../@core/classes/developer';
import { DeveloperService } from '../../../@core/shared/developer.service';

import { Task } from '../../../@core/classes/task';
import { TaskService } from '../../../@core/services/task.service';


@Component({
  selector: 'app-developer-task',
  templateUrl: './developer-task.component.html',
  styleUrls: ['./developer-task.component.scss'],
  providers: [ TaskService ]
})

export class DeveloperTaskComponent implements OnInit {

  developer: Developer;

  sub: any;
  taskId: string;
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private taskService: TaskService
  ) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
    this.task = new Task(this.developer);

    this.sub = this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.getTask();
    });
  }

  ngOnInit() {
  }

  getTask() {
    this.taskService.getTask(this.taskId).then(res => {
      console.log(res);
      this.task = res;
    });
  }
}
