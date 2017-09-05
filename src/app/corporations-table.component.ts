import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from './model/page';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {TableColumnToDataColumnMap} from './model/table-column-to-data-column-map';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corporations-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss']
})


export class CorporationsTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<Object>();
  private columns = new Array<Object>();
  private columnMap:  Array<TableColumnToDataColumnMap> =  [new TableColumnToDataColumnMap('organizationName', 'Organization Name')];


  constructor(private activatedRoute: ActivatedRoute, private entityTypeNameTypeService: EntityTypeNameTypeService, private corporateEntityService: LegalEntityLoaderService ) {
    this.page.pageNumber = 0;
    this.page.size = 5;

    this.activatedRoute.data
      .subscribe( (data) => {
        for ( const k of this.entityTypeNameTypeService.getEntityTypeNameTypes( data['columnData'], 'Corporation')){
          this.columns.push({name: k });
        }
      });
  }

  ngOnInit() {
     this.setPage({ offset: 0 });
    console.log( 'Init CorporationsTableComponent');
  }


  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.corporateEntityService.getData(this.page, this.columnMap, 'Corporation').then(  retVal => { this.rows = retVal; } );
  }

}
