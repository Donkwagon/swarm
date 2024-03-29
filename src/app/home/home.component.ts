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
  tasksCompleted: Task[];

  constructor(private developerService: DeveloperService, private taskService: TaskService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
    this.tasks = []
    this.tasksCompleted = []
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().then(res => {
      res.forEach(task => {
        if(task.complete){
          this.tasksCompleted.push(task);
        }else{
          this.tasks.push(task);
        }
      })
    })
  }

  complete(task) {
    task.complete = !task.complete;
    this.taskService.updateTask(task).then(res=> {
      if(!res){//reverse the update if didn't get updated in backend
        task.complete = !task.complete;
        
      }else{
        this.tasksCompleted.push(task);
        for (var i = 0; i < this.tasks.length; i++) {
          var t = this.tasks[i];
          if(t._id === task._id){
            this.tasks.splice(i,1);
          }
        }
      }
    });
  }

  deleteTask(task) {
    this.taskService.deleteTask(task._id).then(res => {

      //remove the deleted task from the list
      for (var i = 0; i < this.tasks.length; i++) {
        var t = this.tasks[i];
        if(t._id === task._id){
          this.tasks.splice(i,1);
        }
      }
    }); 
  }

}
