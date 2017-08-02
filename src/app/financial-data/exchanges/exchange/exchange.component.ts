import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exchange } from "../../../@core/classes/financial-data/exchange";
import { ExchangeService } from "../../../@core/services/financial-data/exchange.service";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  providers: [ExchangeService]
})

export class ExchangeComponent implements OnInit {

  exchange: Exchange;
  exchangeSymbol: string;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService) {
      this.exchange = new Exchange();
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.exchangeSymbol = params['exchangeSymbol'];
      this.getExchange();
    });
  }

  getExchange() {
    this.exchangeService.getExchange(this.exchangeSymbol).then(res => {
      res? this.exchange = res : console.log(res);
    })
  }

}
