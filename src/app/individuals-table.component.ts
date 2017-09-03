import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IndividualEntity} from './model/individual-entity';
import {Page} from './model/page';
import {IndividualEntityService} from './service/individual-entity-service';
import { ActivatedRoute } from '@angular/router';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';

@Component({
  selector: 'app-individuals-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss']
})
export class IndividualsTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<IndividualEntity>();
  private columns = new Array<Object>();

    constructor(private activatedRoute: ActivatedRoute, private entityTypeNameTypeService: EntityTypeNameTypeService,
                private individualEntityService: IndividualEntityService ) {
      this.page.pageNumber = 0;
      this.page.size = 20;

      this.activatedRoute.data
        .subscribe( (data) => {
          for ( const k of this.entityTypeNameTypeService.getEntityTypeNameTypes( data['columnData'], 'Individual')){
            this.columns.push({name: k});
          }
          this.columns.push({name: 'Address Type'});
          this.columns.push({name: 'Street'});
          this.columns.push({name: 'City'});
          this.columns.push({name: 'State'});
          this.columns.push({name: 'Zip Code'});
        });
    };


  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    console.log( 'Init IndividualsTableComponent');

    this.page.pageNumber = pageInfo.offset;


    if ( this.rows.length === 0 ) {
      this.individualEntityService.getData(this.page).then(  retVal => { this.rows = retVal;
      } );
    }
  }

}
