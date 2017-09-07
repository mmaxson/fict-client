import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from './model/page';
import {AddressPage} from './model/address-page';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {EntityAddressLoaderService} from './service/entity-address-loader';

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

  private addressPage = new AddressPage();
  private addressRows = new Array<Object>();
  private addressColumns = [{ name: 'Address' }, { name: 'Street' }, { name: 'City' }, { name: 'State' }, { name: 'Zip Code' }];

  private selected = [];
  private currentLegalEntityId: number;

  constructor(private activatedRoute: ActivatedRoute, private entityTypeNameTypeService: EntityTypeNameTypeService,
              private legalEntityLoaderService: LegalEntityLoaderService, private entityAddressLoaderService: EntityAddressLoaderService ) {
    this.page.pageNumber = 0;
    this.page.size = 5;

    this.addressPage.pageNumber = 0;
    this.addressPage.size = 5;

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

  onActivate(event) {
//    console.log('Activate Event', event);
    this.currentLegalEntityId =  event.row['legalEntityId'];
    this.setAddressPage({ offset: 0 });

  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.legalEntityLoaderService.getData(this.page, this.columns, this.entityType).then(  retVal => { this.rows = retVal; } );
  }

  setAddressPage(pageInfo) {
    this.addressPage.pageNumber = pageInfo.offset;
    this.entityAddressLoaderService.getData(this.addressPage, this.currentLegalEntityId ).then(  retVal => { this.addressRows = retVal; } );
  }
}
