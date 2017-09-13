import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  addressTypes: Array<AddressType> ;

  states: Array<string> = ['AL', 'AK', 'AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY',
    'LA','ME','MH','MD','MA','MI','MN','MS', 'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC',
    'SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'];

  private selectedState: string = this.states[0];


  public addressForm = new FormGroup({
  //  name: new FormControl()
  });

  constructor( private activatedRoute: ActivatedRoute, private fb: FormBuilder, public dialogRef: MdDialogRef<EntityAddressFormComponent>,
                                 @Inject(MD_DIALOG_DATA) public dialogData: any) {
    this.createForm();
    this.populateForm();

    this.activatedRoute.data
      .subscribe( (routeData) => {
        this.addressTypes = routeData['addressTypes'];
      });
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
    console.log(this.dialogData.entityAddress.addressType.addressTypeId);
    this.addressForm.setValue({
      addressType: this.dialogData.entityAddress.addressType.addressTypeId,
      street:  this.dialogData.entityAddress.street,
      city: this.dialogData.entityAddress.city,
      state: this.dialogData.entityAddress.state,
      zipCode: this.dialogData.entityAddress.zipCode,
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
