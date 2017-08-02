import { Component, OnInit } from '@angular/core';

import { Exchange } from "../../@core/classes/financial-data/exchange";
import { ExchangeService } from "../../@core/services/financial-data/exchange.service";
import { Security } from "../../@core/classes/financial-data/security";
import { SecurityService } from "../../@core/services/financial-data/security.service";

@Component({
  selector: 'app-financial-data-overall',
  templateUrl: './financial-data-overall.component.html',
  styleUrls: ['./financial-data-overall.component.scss'],
  providers: [ExchangeService, SecurityService]
})

export class FinancialDataOverallComponent implements OnInit {
  
  exchanges: Exchange[];
  arrProcIndex: number;

  constructor(private exchangeService: ExchangeService, private securityService: SecurityService) {
    this.exchanges = [];
    this.arrProcIndex = -1;
  }

  ngOnInit() {
    this.exchangeService.getExchanges().then(res => {
      console.log(res);
      res ? res.forEach(exchange => {
        this.exchanges.push(exchange);
      }) : console.log(res);
    })
  }

  updateExchanges() {
    if(this.arrProcIndex < this.exchanges.length){
      this.arrProcIndex++;
      var exchange = this.exchanges[this.arrProcIndex];
      this.exchangeService.getNumSecurities(exchange.exchange).then(result => {
        console.log(result);
      });

      setTimeout(() => {this.updateExchanges()},1000);
    }
  }

  fetchExchanges() {
    this.exchangeService.fetchLatestExchanges().then(result => {
      console.log(result);
    });

  }
}
