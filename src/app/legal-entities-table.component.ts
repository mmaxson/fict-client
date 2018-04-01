import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from './model/page';
import {AddressPage} from './model/address-page';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {EntityAddressLoaderService} from './service/entity-address-loader';

import {ActivatedRoute} from '@angular/router';

import {EntityAddressFormComponent} from './entity-address-form.component';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material';

import {EntityAddress} from './model/entity-address';
import {AddressType} from './model/address-type';

import {EntityAddressDTO} from './dto/entity-address.dto';
import {Address} from './model/address';
import {AddressRow} from './model/address-row';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {User} from './model/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-corporations-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss'],
})


export class LegalEntitiesTableComponent implements OnInit {

  private addressTypes: Array<AddressType>;
  private entityType: string;
  private page = new Page();
  private rows = new Array<Object>();
  private columns = new Array<Object>();

  private addressPage = new AddressPage();
  private addressRows = new Array<AddressRow>();

  private disabled = true;

  private selected = [];
  public selectedAddress = [];
  private currentLegalEntityId: number;
  private currentAddress: EntityAddress;

  private currentAddressRow: AddressRow;
  private user: User;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog, private entityTypeNameTypeService: EntityTypeNameTypeService,
              private legalEntityLoaderService: LegalEntityLoaderService, private entityAddressLoaderService: EntityAddressLoaderService,
              private http: HttpClient, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private toastrService: ToastrService) {

    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));


    this.page.pageNumber = 0;
    this.page.size = 5;

    this.addressPage.pageNumber = 0;
    this.addressPage.size = 5;

    this.activatedRoute.parent.data.subscribe( (routeData) => {
      this.user = routeData['user'];
    });

    this.activatedRoute.data
      .subscribe((routeData) => {
        for (const k of this.entityTypeNameTypeService.getEntityTypeNameTypes(routeData['columnData'], routeData['entityType'])) {
          this.columns.push({name: k});
          this.entityType = routeData['entityType'];
          this.addressTypes = routeData['addressTypes'];
        }
      });
  }

  ngOnInit() {
    this.setPage({offset: 0});
    console.log('Init ' + this.entityType);
  }

  onSelect(event) {
    console.log(event);
    this.currentLegalEntityId = event.selected[0]['legalEntityId'];
    this.setAddressPage({offset: 0});

  }


  onActivateAddress(event) {

    if ( this.selectedAddress.length === 0 ) {
      this.disabled = true;
      return;
    }

    this.currentAddressRow = event.row;
    this.currentAddress = new EntityAddress(this.currentLegalEntityId, event.row['entityAddressId'],
      new AddressType(event.row['addressTypeId'], event.row['address']),
      new Address(event.row['addressId'], event.row['street'], event.row['city'], event.row['state'], event.row['zipCode']));

    this.disabled = false;
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.legalEntityLoaderService.getData(this.user, this.page, this.columns, this.entityType).then(retVal => {
      this.rows = retVal;
    },
       err => {
           this.toastrService.error(err, 'Entity Loader Service');
      });
  }

  setAddressPage(pageInfo) {
    this.addressPage.pageNumber = pageInfo.offset;
    this.loadAddressPage();
  }

  loadAddressPage() {
    this.entityAddressLoaderService.getData(this.user, this.addressPage, this.currentLegalEntityId, this.addressTypes).then(retVal => {
      this.addressRows = retVal;
    },
      err => {
        this.toastrService.error(err, 'Entity Address Loader Service');
      });
  }

  public update() {
    const dialogRef: MatDialogRef<EntityAddressFormComponent> = this.edit('update');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const entityAddressDTO: EntityAddressDTO  = result;
        this.currentAddressRow.addressTypeId =  entityAddressDTO.addressTypeId;
        this.currentAddressRow.address = AddressType.getAddressTypeText(entityAddressDTO.addressTypeId, this.addressTypes);
        this.currentAddressRow.street = entityAddressDTO.address.street;
        this.currentAddressRow.city = entityAddressDTO.address.city;
        this.currentAddressRow.state = entityAddressDTO.address.state;
        this.currentAddressRow.zipCode = entityAddressDTO.address.zipCode;
        this.disabled = true;
        this.selectedAddress = [];
      }
    });
  }

  public add() {
    this.currentAddress = new EntityAddress(this.currentLegalEntityId);
    const dialogRef: MatDialogRef<EntityAddressFormComponent> = this.edit('add');

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const entityAddressDTO: EntityAddressDTO  = result;
        this.addressRows.push(new AddressRow(entityAddressDTO.entityAddressId,
          entityAddressDTO.addressTypeId,
          AddressType.getAddressTypeText(entityAddressDTO.addressTypeId, this.addressTypes),
          entityAddressDTO.address.addressId,
          entityAddressDTO.address.street, entityAddressDTO.address.city,
          entityAddressDTO.address.state, entityAddressDTO.address.zipCode));
      }
    });

  }

  edit(action: string): MatDialogRef<EntityAddressFormComponent> {
    return this.dialog.open(EntityAddressFormComponent,
      {
        disableClose: false,
        height: '400px',
        width: '600px',
        data: {action: action, entityAddress: this.currentAddress, addressTypes: this.addressTypes, user: this.user}
      });
  }

  public delete() {
    this.http.delete<Array<string>>('//localhost:8080/murun/fict/addresses/id/' + this.currentAddressRow.entityAddressId, {
      params: new HttpParams()
        .set('access_token', this.user.access_token)
    }).subscribe(
      response => {
        console.log(response);
        this.loadAddressPage();
        this.disabled = true;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        this.toastrService.error('Error deleting entity address.', 'Entity Address Delete');
      });
  }

}

