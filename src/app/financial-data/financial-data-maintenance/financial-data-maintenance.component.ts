import { Component, OnInit } from '@angular/core';
import { SecurityMaintenanceService } from "../../@core/services/financial-data/security.maintenance.service";

@Component({
  selector: 'app-financial-data-maintenance',
  templateUrl: './financial-data-maintenance.component.html',
  styleUrls: ['./financial-data-maintenance.component.scss'],
  providers: [ SecurityMaintenanceService ]
})
export class FinancialDataMaintenanceComponent implements OnInit {

  constructor(private securityMaintenanceService: SecurityMaintenanceService) { }

  ngOnInit() {
  }

  updateIEXListing() {
    this.securityMaintenanceService.updateIEXListing().then(res => {
      console.log(res);
    })
  }

  getIEXData() {
    this.securityMaintenanceService.getIEXData().then(res => {
      console.log(res);
    })
  }

  getAllIEXListedData() {
    this.securityMaintenanceService.getAllIEXListedData().then(res => {
      console.log(res);
    })
  }

}
