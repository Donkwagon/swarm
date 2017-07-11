import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Crawler }                           from '../../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../../@core/services/crawler.service';
import { Site }                              from '../../../../@core/classes/site';
import { SiteService }                       from '../../../../@core/services/sites.service';

import { SocketService }                     from '../../../../@core/services/socket.service';
import { AceEditorComponent } from 'ng2-ace-editor'; 

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss'],
  providers: [CrawlerService,SiteService,SocketService]
})

export class CrawlerComponent implements OnInit {

  @ViewChild('editor') editor;
  messages = [];
  connection;
  testingDataOutput;
  testingData = [];
  message;

  mode: string;

  sub_crawler:any;
  siteName: string;
  site: Site;

  urlStrategy: String[];
  urlTypes: String[];

  newUrlSectionPanel :Boolean;
  curUrlType: String;

  curNewUrlSection: any;
  newConst: any;
  newIdRange: any;
  newTicker: any;

  testingStrategy: string;

  sub: any;
  crawlerId: string;
  crawler: Crawler;

  max: number;
  min: number;

  constructor(
      private route: ActivatedRoute,
      private crawlerService: CrawlerService,
      private siteService: SiteService,
      private socketService: SocketService){

      this.urlTypes = ["CONSTANT","ID RANGE","TICKER"];

      this.newUrlSectionPanel = false;
      
      this.crawler = new Crawler();
      this.resetNewInputs();
      this.mode = "settings";

  }

  ngOnInit() {

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

    this.sub_crawler = this.route.params.subscribe(params => {
      this.crawlerId = params['crawlerId'];
      this.getCrawler();
    });

    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    })

    this.testingDataOutput = this.socketService.getMessages().subscribe(data => {
      this.testingData.push(data);
    })

    this.message = "some messge";
    this.sendMessage();

  }

  ngOnDestroy() {

    this.sub.unsubscribe();

    this.sub_crawler.unsubscribe();

    this.connection.unsubscribe();
    this.testingDataOutput.unsubscribe();

  }

  selectmode = (mode) => {this.mode = mode;}
  
  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });

  }
  
  getCrawler = () => {

    this.crawlerService.getCrawler(this.crawlerId).then(res => {

      this.crawler = res;

    });

  }

  ////////////////////////////////////////////////////////////////////////////
  //url panel logic
  ////////////////////////////////////////////////////////////////////////////

  toggleNewUrlSectionPanel = () => {

    this.resetNewInputs();
    this.newUrlSectionPanel ?
      this.newUrlSectionPanel = false :
      this.newUrlSectionPanel = true;

  }

  selectNewUrlSectionType = (type) => {

    this.resetNewInputs();
    this.curUrlType = type;

  }

  addNewUrlSection = () => {

    if(this.curUrlType === "CONSTANT"){
      this.crawler.urlStrategy.sections.push(this.newConst);
    }
    if(this.curUrlType == "ID RANGE"){
      this.crawler.urlStrategy.sections.push(this.newIdRange);

    }
    if(this.curUrlType === "TICKER"){
      this.crawler.urlStrategy.sections.push(this.newTicker);
    }

    this.resetNewInputs();
  }

  removeUrlSection = (urlSection) => {

    var index = this.crawler.urlStrategy.sections.indexOf(urlSection);
    this.crawler.urlStrategy.sections.splice(index,1);

  }

  resetNewInputs = () => {
    
    this.curUrlType = null;

    this.newConst = {
      type:"CONSTANT",
      url: "",
      prefix: "",
      suffix: ""
    };

    this.newIdRange = {
      type:"ID RANGE",
      min: 0,
      max: 0,
      prefix: "",
      suffix: ""
    };

    this.newTicker = {
      type:"TICKER",
      prefix: "",
      suffix: ""
    }

  }

  ////////////////////////////////////////////////////////////////////////////
  //editor logic
  ////////////////////////////////////////////////////////////////////////////

  setTestingStrategy = () => {
    if(this.testingStrategy === 'single'){
        this.crawler.testingStrategy = {
          type: "single",
          id : 1024
        }
    }
    if(this.testingStrategy === 'multiple'){
        this.crawler.testingStrategy = {
          type: "multiple",
          num : 1024
        }
    }
  }

  onChange = () => {}

  runCode = () => {
    this.crawlerService.runCode(this.crawler).then(res => {
    });
  }

  validateCode = () => {
  }

  ////////////////////////////////////////////////////////////////////////////
  //web socket shit
  ////////////////////////////////////////////////////////////////////////////

  save = () => {
    this.crawlerService.updatCrawler(this.crawler).then(res => {});
  }

  sendMessage(){

    this.socketService.sendMessage(this.message);
    this.message = '';

  }
  
}