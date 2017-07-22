import { Component, OnInit } from '@angular/core';

import { Developer } from '../@core/classes/developer';
import { DeveloperService } from '../@core/shared/developer.service';
import { Task } from '../@core/classes/task';
import { TaskService } from '../@core/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TaskService]
})

export class HomeComponent implements OnInit {
  
  developer: Developer;
  tasks: Task[];

  constructor(private developerService: DeveloperService, private taskService: TaskService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
    this.tasks = []
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().then(res => {
      this.tasks = res;
    })
  }

}
