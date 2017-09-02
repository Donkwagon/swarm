import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Crawler }                           from '../../@core/classes/crawler';
import { CrawlerService }                    from '../../@core/services/crawler.service';
import { Site }                              from '../../@core/classes/site';
import { SiteService }                       from '../../@core/services/sites.service';

import { Developer }                         from '../../@core/classes/developer';
import { DeveloperService }                  from '../../@core/shared/developer.service';

import { SocketService }                     from '../../@core/services/socket.service';
import { AceEditorComponent } from 'ng2-ace-editor'; 


@Component({
  selector: 'app-crawler-code',
  templateUrl: './crawler-code.component.html',
  styleUrls: ['./crawler-code.component.scss'],
  providers: [CrawlerService,SiteService,SocketService]
})

export class CrawlerCodeComponent implements OnInit {

  @ViewChild('editor') editor;
  messages = [];
  connection;
  testingDataOutput;
  testingData = [];
  message;

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

  consoleMode: string;

  developer: Developer;

  display: String;

  constructor(
      private route: ActivatedRoute,
      private crawlerService: CrawlerService,
      private siteService: SiteService,
      private developerService: DeveloperService,
      private socketService: SocketService){

      this.urlTypes = ["CONSTANT","ID RANGE","TICKER"];

      this.newUrlSectionPanel = false;

      this.developer = new Developer();
      this.developer = developerService.accessDeveloper();
      
      this.crawler = new Crawler(this.developer);
      this.resetNewInputs();

      this.consoleMode = "response";

      this.display = "console";

  }

  ngOnInit() {


    this.sub_crawler = this.route.parent.params.subscribe(params => {
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

    this.sub_crawler.unsubscribe();

    this.connection.unsubscribe();
    this.testingDataOutput.unsubscribe();

  }

  selectDisplay = (display) => {
    this.display = display;
  }

  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });

  }
  
  getCrawler = () => {

    this.crawlerService.getCrawler(this.crawlerId).then(res => {
      Object.assign(this.crawler, res);
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

  generateBacklog = () => {
    this.crawlerService.generateBacklog(this.crawler).then(res => {
      console.log(res);
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  //Ouput Interface logic
  ////////////////////////////////////////////////////////////////////////////

  selectConsoleMode = (consoleMode) => {
    this.consoleMode = consoleMode;
  }

  ////////////////////////////////////////////////////////////////////////////
  //web socket shit
  ////////////////////////////////////////////////////////////////////////////

  save = () => {
    this.crawlerService.updateCrawler(this.crawler).then(res => {});
  }

  sendMessage(){

    this.socketService.sendMessage(this.message);
    this.message = '';

  }

}
