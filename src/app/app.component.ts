import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(private entityTypeNameTypeService: EntityTypeNameTypeService ) {}

  ngOnInit() {
    this.entityTypeNameTypeService.loadEntityTypeNameTypeList( this.entityTypeNameTypeService.getEntityTypeNameTypeList() );
  }

}

