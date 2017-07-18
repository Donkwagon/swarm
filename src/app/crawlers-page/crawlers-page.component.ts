import { Component, OnInit } from '@angular/core';
import { CrawlerService } from '../@core/services/crawler.service'
import { Crawler } from '../@core/classes/crawler'

@Component({
  selector: 'app-crawlers-page',
  templateUrl: './crawlers-page.component.html',
  styleUrls: ['./crawlers-page.component.scss'],
  providers: [CrawlerService]
})
export class CrawlersPageComponent implements OnInit {

  crawlers: Crawler[];

  constructor(private crawlerService: CrawlerService) {
    this.crawlers = [];
  }

  ngOnInit() {
    this.getCrawlers();
  }

  getCrawlers() {
    this.crawlerService.getCrawlers().then(res => {
      console.log(res);
      res.forEach(crawler => {
        this.crawlers.push(crawler);
      })
    })
  }

}
