import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exchange } from "../../../../@core/classes/financial-data/exchange";
import { ExchangeService } from "../../../../@core/services/financial-data/exchange.service";
import { Security } from "../../../../@core/classes/financial-data/security";
import { SecurityService } from "../../../../@core/services/financial-data/security.service";

@Component({
  selector: 'app-exchange-securities',
  templateUrl: './exchange-securities.component.html',
  styleUrls: ['./exchange-securities.component.scss'],
  providers: [ExchangeService, SecurityService]
})

export class ExchangeSecuritiesComponent implements OnInit {

  exchange: Exchange;
  exchangeSymbol: string;
  sub: any;

  securities: Security[];

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private securityService: SecurityService) {

      this.exchange = new Exchange();
      this.securities = [];

  }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.exchangeSymbol = params['exchangeSymbol'];
      this.getExchange();
      //this.getSecuritiesByExchange();
    });
  }

  getExchange() {
    this.exchangeService.getExchange(this.exchangeSymbol).then(res => {
      res ? this.exchange = res : console.log(res);
    })
  }

  getSecuritiesByExchange() {
    this.securityService.getSecuritiesByExchange(this.exchangeSymbol).then(res => {
      console.log(res);
      res ? res.forEach(security => {
        this.securities.push(security);
      }) : console.log(res);
    })
  }

  onScroll() {
    console.log("scrolling");
  }

}
