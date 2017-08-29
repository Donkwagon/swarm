import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Crawler }                           from '../@core/classes/crawler';
import { CrawlerService }                    from '../@core/services/crawler.service';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss'],
  providers: [CrawlerService]
})
export class CrawlerComponent implements OnInit {

  crawlerId: string;
  crawler: Crawler;

  sub_crawler: any;
  constructor(
    private route: ActivatedRoute,
    private crawlerService: CrawlerService) { }

  ngOnInit() {
    
        this.sub_crawler = this.route.params.subscribe(params => {
          this.crawlerId = params['crawlerId'];
          this.getCrawler();
        });
    
  }
  
    getCrawler = () => {
  
      this.crawlerService.getCrawler(this.crawlerId).then(res => {
  
        res ? this.crawler = res : console.log(res);
  
      });
  
    }
  

}
