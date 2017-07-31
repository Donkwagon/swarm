import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { RouterMapper }      from '../../@core/classes/router-mapper';

@Component({
  selector: 'app-app-route-map',
  templateUrl: './app-route-map.component.html',
  styleUrls: ['./app-route-map.component.scss']
})
export class AppRouteMapComponent implements OnInit {

  routerMapper: RouterMapper;

  constructor(private router: Router) {

    this.routerMapper = new RouterMapper("SWARM",router.config);

  }

  ngOnInit() {
    console.log(JSON.stringify(this.routerMapper));
  }

}
