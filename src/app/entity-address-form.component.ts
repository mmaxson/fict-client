import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';

import {EntityAddressSaverService} from './service/entity-address-saver';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {AddressType} from './model/address-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntityAddress} from './model/entity-address';
import {Address} from './model/address';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-entity-address-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './entity-address-form.component.html',
  styleUrls: ['./entity-address-form.component.css']
})
export class EntityAddressFormComponent implements OnInit {

  addressTypes: Array<AddressType> ;

  states: Array<string> = ['AL', 'AK', 'AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY',
    'LA','ME','MH','MD','MA','MI','MN','MS', 'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC',
    'SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'];

  private selectedState: string = this.states[0];


  public addressForm = new FormGroup({
  //  name: new FormControl()
  });

  constructor( private fb: FormBuilder, public dialogRef: MdDialogRef<EntityAddressFormComponent>,
               @Inject(MD_DIALOG_DATA) public dialogData: any, private http: HttpClient,
               private entityAddressSaverService: EntityAddressSaverService ) {
    this.addressTypes = this.dialogData.addressTypes;
    this.createForm();
    this.populateForm();
  }


  createForm() {
    this.addressForm = this.fb.group({
      addressType: ['', Validators.required ],
      street: ['', Validators.required ],
      city: ['', Validators.required ],
      state: ['', Validators.required ],
      zipCode: ['', Validators.required ],
    });
  }

  populateForm() {
    this.addressForm.setValue({
      addressType: this.dialogData.entityAddress.addressType.addressTypeId,
      street:  this.dialogData.entityAddress.address.street,
      city: this.dialogData.entityAddress.address.city,
      state: this.dialogData.entityAddress.address.state,
      zipCode: this.dialogData.entityAddress.address.zipCode,
    });
  }

  ngOnInit() {
    console.log('EntityAddressFormComponent');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();

    const entityAddressToBeSaved: EntityAddress = new EntityAddress( this.dialogData.entityAddress.entityAddressId,
      new AddressType( this.addressForm.get('addressType').value,
                       AddressType.getAddressTypeText( this.addressForm.get('addressType').value , this.addressTypes )),
      new Address( this.dialogData.entityAddress.address.addressId, this.addressForm.get('street').value,
                   this.addressForm.get('city').value, this.addressForm.get('state').value, this.addressForm.get('zipCode').value),
      this.dialogData.entityAddress.legalEntityId);

console.log(JSON.stringify(entityAddressToBeSaved));
    // Content-Type: my-auth-token and Accept: application/json
    this.http.put<Array<string>>('//localhost:8080/murun/fict/addresses/', JSON.stringify(entityAddressToBeSaved), {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set( 'Accept', 'application/json' ).set('charset', 'utf-8')  }

  ).subscribe(
      response => {
      },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });

  }

}
