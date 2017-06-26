import { Component, OnInit } from '@angular/core';
import { Site } from '../@core/classes/site';
import { SiteService } from '../@core/services/sites.service';
import { AceEditorComponent  } from 'ng2-ace-editor'; 


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
  providers: [ SiteService ]
})
export class SitesComponent implements OnInit {

  newSite: Site;
  newSiteBool: Boolean;
  sites: Site[];

  constructor(private siteService: SiteService) {
    this.newSiteBool = false;
    this.newSite = new Site();
  }

  ngOnInit() {
    this.getSiteList();
  }

  getSiteList = () => {
    this.siteService.getSites().then(res => {
      this.sites = res;
    });
  }

  createNewSite = () => {
    if(!this.newSiteBool){this.newSiteBool = true;}
  }

  submitNewSite = () => {
    this.siteService.createSite(this.newSite).then(res => {
      console.log(res);
    });
  }

}
