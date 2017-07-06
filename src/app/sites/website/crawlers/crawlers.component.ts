import { Component, OnInit, OnDestroy, Input }     from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Site }                              from '../../../@core/classes/site';
import { SiteService }                       from '../../../@core/services/sites.service';
import { Crawler }                           from '../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../@core/services/crawler.service';
import { SocketService }                     from '../../../@core/services/socket.service';

@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss'],
  providers: [SiteService,CrawlerService,SocketService]
})

export class CrawlersComponent implements OnInit {

  messages = [];
  connection;
  message;

  sub: any;
  siteName: string;
  site: Site;

  crawlers: Crawler[];

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private crawlerService: CrawlerService,
    private socketService: SocketService){
    }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
      this.getCrawlers();
    });

    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    })

    this.message = "some messge";
    this.sendMessage();

  }
  
  ngOnDestroy() {

    this.sub.unsubscribe();

    this.connection.unsubscribe();

  }
  
  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });
  }
  
  
  getCrawlers = () => {

    this.crawlerService.getCrawlersBySite(this.siteName).then(res => {

      console.log(res);
      this.crawlers = res;
      
    });

  }
  

  sendMessage(){

    this.socketService.sendMessage(this.message);
    this.message = '';

  }

}
