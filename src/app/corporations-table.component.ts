import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CorporateEntity} from './model/corporate-entity';
import {Page} from './model/page';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {CorporateEntityService} from './service/corporate-entity-service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corporations-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss']
})
export class CorporationsTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<CorporateEntity>();
  private columns = new Array<Object>();

  constructor(private activatedRoute: ActivatedRoute, private entityTypeNameTypeService: EntityTypeNameTypeService, private corporateEntityService: CorporateEntityService ) {
    this.page.pageNumber = 0;
    this.page.size = 20;

    this.activatedRoute.data
      .subscribe( (data) => {
        for ( const k of this.entityTypeNameTypeService.getEntityTypeNameTypes( data['columnData'], 'Corporation')){
          this.columns.push({name: k});
        }
        this.columns.push({name: 'Address Type'});
        this.columns.push({name: 'Street'});
        this.columns.push({name: 'City'});
        this.columns.push({name: 'State'});
        this.columns.push({name: 'Zip Code'});
      });
  }

  ngOnInit() {
     this.setPage({ offset: 0 });
  }


  setPage(pageInfo) {
    console.log( 'Init CorporationsTableComponent');

    this.page.pageNumber = pageInfo.offset;
    if ( this.rows.length === 0 ) {
      this.corporateEntityService.getData(this.page).then(  retVal => { this.rows = retVal;
      } );
    }

  }

}
