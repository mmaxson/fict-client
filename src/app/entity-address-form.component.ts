import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';

import {EntityAddress} from './model/entity-address';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {AddressType} from './model/address-type';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-entity-address-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './entity-address-form.component.html',
  styleUrls: ['./entity-address-form.component.css']
})
export class EntityAddressFormComponent implements OnInit {

   addressTypes: Array<AddressType> = [new AddressType(1, 'Residence'),
    new AddressType(2, 'Work'), new AddressType(3, 'Mailing'), new AddressType(4, 'Branch'), new AddressType(5, 'Headquarters'),
    new AddressType(6, 'Warehouse'), new AddressType(7, 'Divisional Headquarters')];


  private selectedAddressTypeId: number = this.addressTypes[0].addressTypeId;

   states: Array<string> = ['AL', 'AK', 'AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY',
    'LA','ME','MH','MD','MA','MI','MN','MS', 'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC',
    'SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'];

  private selectedState: string = this.states[0];


  public addressForm = new FormGroup({
  //  name: new FormControl()
  });

  constructor( private fb: FormBuilder, public dialogRef: MdDialogRef<EntityAddressFormComponent>,
                                 @Inject(MD_DIALOG_DATA) public data: any) {
    this.createForm();
    this.populateForm();
  }


  createForm() {
    this.addressForm = this.fb.group({
      addressType: '',
      street: ['', Validators.required ],
      city: ['', Validators.required ],
      state: '',
      zipCode: ['', Validators.required ],
    });
  }

  populateForm() {
    console.log(this.data.entityAddress.addressType.addressTypeId);
    this.addressForm.setValue({
      addressType: this.data.entityAddress.addressType.addressTypeId,
      street:  this.data.entityAddress.street,
      city: this.data.entityAddress.city,
      state: this.data.entityAddress.state,
      zipCode: this.data.entityAddress.zipCode,
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
console.log('submitted.');
  }

}
