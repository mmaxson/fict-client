import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import { RouteConfigLoadStart } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './application-main.component.html',
 // styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ApplicationMainComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}

