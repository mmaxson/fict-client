import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import { RouteConfigLoadStart } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit {

  constructor(private router: Router, private entityTypeNameTypeService: EntityTypeNameTypeService ) {
  }

  ngOnInit() {
    console.log('app init');
    // this.entityTypeNameTypeService.loadEntityTypeNameTypeList( this.entityTypeNameTypeService.getEntityTypeNameTypeList() );
  }

}

