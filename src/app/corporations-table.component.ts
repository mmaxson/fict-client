import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CorporateEntity} from './model/corporate-entity';
import {TableColumn} from './model/table-column';
import {Page} from './model/page';
import {CorporateEntityService} from './service/corporate-entity-service';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';

@Component({
  selector: 'app-corporations-table',
  providers: [
    EntityTypeNameTypeService, CorporateEntityService
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './corporations-table.component.html',
  styleUrls: ['./corporations-table.component.scss']
})
export class CorporationsTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<CorporateEntity>();
  private columns = new Array<Object>();

  constructor(private entityTypeNameTypeService: EntityTypeNameTypeService, private corporateEntityService: CorporateEntityService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
   // this.columns =  [{name: 'Name'}, {name: 'Address Type'}, {name: 'Street'}, {name: 'City'}, {name: 'State'}, {name: 'Zip Code'}];
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    const columnsStr: Array<string> = this.entityTypeNameTypeService.getEntityTypeNameTypes( 'Corporation' );
    for ( const val of columnsStr){
      console.log( val );
      this.columns.push( {'name': val });
    }

    for ( const val2 of this.entityTypeNameTypeService.getTestVar()){
      console.log( val2 );

    }

    this.page.pageNumber = pageInfo.offset;
    this.corporateEntityService.getData( this.page, this.rows );
  }

}
