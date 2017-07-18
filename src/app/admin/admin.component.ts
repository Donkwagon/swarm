import { Component, OnInit } from '@angular/core';
import { DeveloperService} from '../@core/shared/developer.service';
import { Developer } from '../@core/classes/developer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [DeveloperService]
})
export class AdminComponent implements OnInit {

  developers: Developer[];

  constructor(private developerService: DeveloperService) {
    this.developers = [];
  }

  ngOnInit() {
    this.getDevelopers();
  }

  getDevelopers() {
    this.developerService.getDevelopers().then(res => {
      console.log(res);
      res.forEach(developer => {
        this.developers.push(developer);
      });
    });
  }

}
