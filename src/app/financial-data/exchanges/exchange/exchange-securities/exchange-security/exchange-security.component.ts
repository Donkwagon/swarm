import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exchange } from "../../../../../@core/classes/financial-data/exchange";
import { ExchangeService } from "../../../../../@core/services/financial-data/exchange.service";
import { Security } from "../../../../../@core/classes/financial-data/security";
import { SecurityService } from "../../../../../@core/services/financial-data/security.service";

@Component({
  selector: 'app-exchange-security',
  templateUrl: './exchange-security.component.html',
  styleUrls: ['./exchange-security.component.scss'],
  providers: [ExchangeService, SecurityService]
})
export class ExchangeSecurityComponent implements OnInit {

  exchange: Exchange;
  exchangeSymbol: string;
  sub: any;
  subA: any;

  security: Security;
  symbol: string;

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private securityService: SecurityService) {

      this.exchange = new Exchange();

  }

  ngOnInit() {

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.exchangeSymbol = params['exchangeSymbol'];
      this.getExchange();
    });

    this.subA = this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.getSecurityBySymbol();
    });
  }

  getExchange() {
    this.exchangeService.getExchange(this.exchangeSymbol).then(res => {
      res ? this.exchange = res : console.log(res);
    })
  }

  getSecurityBySymbol() {
    this.securityService.getSecurityBySymbol(this.symbol).then(res => {
      console.log(res);
      res ? this.security = res : console.log(res);
    })
  }

}
