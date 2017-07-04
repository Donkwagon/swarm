import { Component, OnInit } from '@angular/core';
import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.scss'],
  providers: [SiteService]
})
export class NewSiteComponent implements OnInit {

  newSite: Site;

  constructor(private siteService: SiteService) { 
    this.newSite = new Site();
  }

  ngOnInit() {
  }

  submitNewSite = () => {
    this.siteService.createSite(this.newSite).then(res => {
      console.log(res);
    });
  }

}
