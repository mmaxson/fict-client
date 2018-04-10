import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddressType} from './model/address-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityAddressDTO} from './dto/entity-address.dto';
import {Address} from './model/address';
import {User} from './model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entity-address-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './entity-address-form.component.html',
  styleUrls: ['./entity-address-form.component.css']
})
export class EntityAddressFormComponent implements OnInit {

  addressTypes: Array<AddressType>;

  states: Array<string> = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
    'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

  private selectedState: string = this.states[0];

  private user: User;

  public addressForm = new FormGroup({});


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EntityAddressFormComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any, private http: HttpClient, private toastrService: ToastrService) {
    this.addressTypes = this.dialogData.addressTypes;
    this.user = this.dialogData.user;
    this.createForm();
    this.populateForm();
  }


  createForm() {
    this.addressForm = this.fb.group({
      addressType: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  populateForm() {
    this.addressForm.setValue({
      addressType: this.dialogData.entityAddress.addressType.addressTypeId,
      street: this.dialogData.entityAddress.address.street,
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
    const entityAddressToBeSaved: EntityAddressDTO = new EntityAddressDTO(this.dialogData.entityAddress.entityAddressId,
      this.addressForm.get('addressType').value,
      new Address(this.dialogData.entityAddress.address.addressId,
        this.addressForm.get('street').value, this.addressForm.get('city').value,
        this.addressForm.get('state').value, this.addressForm.get('zipCode').value),
      this.dialogData.entityAddress.legalEntityId);

    if (this.dialogData.action === 'update') {
      this.doPut(entityAddressToBeSaved);
    } else {
      this.doPost(entityAddressToBeSaved);
    }
    this.dialogRef.close(entityAddressToBeSaved);
  }



  doPut(entityAddressToBeSaved: EntityAddressDTO) {
    this.http.put<Array<string>>('//localhost:8080/murun/fict/addresses/', JSON.stringify(entityAddressToBeSaved), {
        params: new HttpParams()
          .set('access_token', this.user.access_token),
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Charset', 'utf-8')
      }
    ).subscribe(
      response => {
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        this.toastrService.error('Error updating entity address.', 'Entity Address Update');
      });
  }

  doPost(entityAddressToBeSaved: EntityAddressDTO) {
    this.http.post<Array<string>>('//localhost:8080/murun/fict/addresses/', JSON.stringify(entityAddressToBeSaved), {
      params: new HttpParams()
        .set('access_token', this.user.access_token),
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Charset', 'utf-8')
      }
    ).subscribe(
      response => {
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        this.toastrService.error('Error adding new entity address.', 'Entity Address Add New');
      });
  }


}
