import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { EntityAddress } from './model/entity-address';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-entity-address-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './entity-address-form.component.html',
  styleUrls: ['./entity-address-form.component.css']
})
export class EntityAddressFormComponent implements OnInit {

  private address = new EntityAddress();

  constructor( public dialogRef: MdDialogRef<EntityAddressFormComponent>,
                                 @Inject(MD_DIALOG_DATA) public data: any) { }



  ngOnInit() {
    console.log('EntityAddressFormComponent');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.address));
  }

}
