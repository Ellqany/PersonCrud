import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { RouteInfo, ROUTES } from '../../models/route-info.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public listTitles: RouteInfo[] = [];
  public location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (const item of this.listTitles) {
      if (item.path === titlee) {
        return item.title;
      }
    }

    return 'List of people';
  }
}
