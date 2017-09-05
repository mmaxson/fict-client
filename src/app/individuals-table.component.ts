import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from './model/page';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {ActivatedRoute} from '@angular/router';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {TableColumnToDataColumnMap} from './model/table-column-to-data-column-map';

@Component({
  selector: 'app-individuals-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss']
})
export class IndividualsTableComponent implements OnInit {

  private page = new Page();
  private columns = new Array<Object>();
  private rows = new Array<Object>();
  private columnMap:  Array<TableColumnToDataColumnMap> =  [new TableColumnToDataColumnMap('first', 'First'),
    new TableColumnToDataColumnMap('last', 'Last'),  new TableColumnToDataColumnMap('middle', 'Middle'),
    new TableColumnToDataColumnMap('title', 'Title')];


  constructor(private activatedRoute: ActivatedRoute, private entityTypeNameTypeService: EntityTypeNameTypeService,
                private corporateEntityService: LegalEntityLoaderService ) {
      this.page.pageNumber = 0;
      this.page.size = 5;

      this.activatedRoute.data
        .subscribe( (data) => {
          for ( const k of this.entityTypeNameTypeService.getEntityTypeNameTypes( data['columnData'], 'Individual')){
            this.columns.push({name: k });
          }
        });
    }


  ngOnInit() {
    this.setPage({ offset: 0 });
    console.log( 'Init IndividualsTableComponent');
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.corporateEntityService.getData(this.page, this.columnMap, 'Individual').then(  retVal => { this.rows = retVal; } );
  }

}
