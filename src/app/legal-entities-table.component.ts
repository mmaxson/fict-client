import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from './model/page';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corporations-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss']
})


export class LegalEntitiesTableComponent implements OnInit {

  private entityType: string;
  private page = new Page();
  private rows = new Array<Object>();
  private columns = new Array<Object>();

  constructor(private activatedRoute: ActivatedRoute, private entityTypeNameTypeService: EntityTypeNameTypeService, private corporateEntityService: LegalEntityLoaderService ) {
    this.page.pageNumber = 0;
    this.page.size = 5;

    this.activatedRoute.data
      .subscribe( (data) => {
        for ( const k of this.entityTypeNameTypeService.getEntityTypeNameTypes( data['columnData'], data['entityType'])){
          this.columns.push({name: k });
          this.entityType =  data['entityType'];
        }
      });
  }

  ngOnInit() {
     this.setPage({ offset: 0 });
     console.log( 'Init ' + this.entityType );
  }


  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.corporateEntityService.getData(this.page, this.columns, this.entityType).then(  retVal => { this.rows = retVal; } );
  }

}
