
import { Component, OnInit } from '@angular/core';

import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';
import { CrawlerService } from '../../@core/services/crawler.service';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss'],
  providers: [SiteService,CrawlerService]
})

export class CrawlerComponent implements OnInit {

  text: any;

  constructor(private siteService: SiteService, private crawlerService: CrawlerService) { }

  ngOnInit() {
  }

  onChange = () => {
    console.log(this.text);
    console.log(JSON.stringify(this.text));
    this.runCode();
  }

  runCode = () => {
    console.log(typeof(this.text));
    this.crawlerService.runCode(this.text).then(res => {
      console.log(res);
    });
  }
}
