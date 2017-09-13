import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from './model/page';
import {AddressPage} from './model/address-page';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {EntityAddressLoaderService} from './service/entity-address-loader';
import {MdDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

import {EntityAddressFormComponent} from './entity-address-form.component';
import {MdDialogRef} from '@angular/material';

import {EntityAddress} from './model/entity-address';
import {AddressType} from './model/address-type';




@Component({
  selector: 'app-corporations-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss'],
})


export class LegalEntitiesTableComponent implements OnInit {

  private addressTypes: Array<AddressType> ;
  private entityType: string;
  private page = new Page();
  private rows = new Array<Object>();
  private columns = new Array<Object>();

  private addressPage = new AddressPage();
  private addressRows = new Array<Object>();

  private disabled = true;

  private selected = [];
  private selectedAddress = [];
  private currentLegalEntityId: number;
  private currentAddress: EntityAddress;
//  private animal : string;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MdDialog, private entityTypeNameTypeService: EntityTypeNameTypeService,
              private legalEntityLoaderService: LegalEntityLoaderService, private entityAddressLoaderService: EntityAddressLoaderService ) {
    this.page.pageNumber = 0;
    this.page.size = 5;

    this.addressPage.pageNumber = 0;
    this.addressPage.size = 5;

    this.activatedRoute.data
      .subscribe( (routeData) => {
        for ( const k of this.entityTypeNameTypeService.getEntityTypeNameTypes( routeData['columnData'], routeData['entityType'])){
          this.columns.push({name: k });
          this.entityType =  routeData['entityType'];
          this.addressTypes = routeData['addressTypes'];
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

  onActivateAddress(event) {
     console.log('Activate Address Event', event);
     this.currentAddress = new EntityAddress ( event.row['entityAddressId'], new AddressType( event.row['addressTypeId'], event.row['address']),
                           event.row['street'], event.row['city'], event.row['state'], event.row['zipCode'] );
     this.disabled = false;
  //  this.setAddressPage({ offset: 0 });
  }



  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.legalEntityLoaderService.getData(this.page, this.columns, this.entityType).then(  retVal => { this.rows = retVal; } );
  }

  setAddressPage(pageInfo) {
    this.addressPage.pageNumber = pageInfo.offset;
    this.entityAddressLoaderService.getData(this.addressPage, this.currentLegalEntityId, this.addressTypes ).then(  retVal => { this.addressRows = retVal; } );
  }


  update() {

    const dialogRef: MdDialogRef<EntityAddressFormComponent> = this.dialog.open(EntityAddressFormComponent,
      {
        disableClose: false,
        height: '600px',
        width: '800px',
        data: { entityAddress: this.currentAddress }
      } );

    dialogRef.afterClosed().subscribe();
    this.disabled = true;
    this.selectedAddress = [];
  }

  private add() {
    this.disabled = true;

  }

  private delete() {
    this.disabled = true;

  }
}
