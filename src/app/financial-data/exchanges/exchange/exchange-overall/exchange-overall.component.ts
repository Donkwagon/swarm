import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exchange } from "../../../../@core/classes/financial-data/exchange";
import { ExchangeService } from "../../../../@core/services/financial-data/exchange.service";
import { Security } from "../../../../@core/classes/financial-data/security";
import { SecurityService } from "../../../../@core/services/financial-data/security.service";

@Component({
  selector: 'app-exchange-overall',
  templateUrl: './exchange-overall.component.html',
  styleUrls: ['./exchange-overall.component.scss'],
  providers: [ExchangeService, SecurityService]
})

export class ExchangeOverallComponent implements OnInit {

  exchange: Exchange;
  exchangeSymbol: string;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private securityService: SecurityService) {
      this.exchange = new Exchange();
  }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.exchangeSymbol = params['exchangeSymbol'];
      this.getExchange();
    });
  }

  getExchange() {
    this.exchangeService.getExchange(this.exchangeSymbol).then(res => {
      this.exchange = res;
    })
  }

}
