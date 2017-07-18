
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../../../@core/classes/site';
import { SiteService } from '../../../@core/services/sites.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SiteService]
})
export class SettingsComponent implements OnInit {

  sub: any;
  siteName: string;
  site: Site;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService) { }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

  }

  ngOnDestroy() {

    this.sub.unsubscribe();

  }

  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });
  }

  discardChanges() {
    return;
  }

  saveChanges() {

    this.siteService.updateSite(this.site).then(res => {
      console.log(res);
    });
  }

  delete() {

    this.siteService.deleteSite(this.site._id).then(res => {
      console.log(res);
    });

  }
}
