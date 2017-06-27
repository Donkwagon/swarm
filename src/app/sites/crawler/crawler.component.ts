
import { Component, OnInit } from '@angular/core';

import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss']
})

export class CrawlerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
