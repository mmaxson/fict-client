import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {
  ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync,
  tick
} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule, appRoutes, routing} from './app-routing.module';
import {ApplicationMainComponent} from './application-main.component';
import {LegalEntitiesTableComponent} from './legal-entities-table.component';
import {EntityAddressFormComponent} from './entity-address-form.component';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication-service';
import {User} from './model/user';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule, APP_BASE_HREF} from '@angular/common';

import {MdDialog, MdDialogModule, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AddressType} from './model/address-type';
import {EntityAddress} from './model/entity-address';
import {Address} from './model/address';


export const corporationAddressTypes: Array<AddressType> = [
  new AddressType(3, 'Mailing'), new AddressType(4, 'Branch'), new AddressType(5, 'Headquarters'),
  new AddressType(6, 'Warehouse'), new AddressType(7, 'Divisional Headquarters')];

@NgModule({
  declarations: [EntityAddressFormComponent],
  imports: [BrowserModule, NoopAnimationsModule, AppMaterialModule, ReactiveFormsModule, MdDialogModule, HttpClientTestingModule],
  providers: [FormBuilder, HttpClient],
  entryComponents: [EntityAddressFormComponent],
//  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [EntityAddressFormComponent],
})
export class TestModule {
}

describe('EntityAddressFormComponent', () => {

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }



  let componentInstance: EntityAddressFormComponent;
  let dialog: MdDialog;
  let fixture: ComponentFixture<EntityAddressFormComponent>;
  let dialogRef;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      declarations: [ApplicationMainComponent, LegalEntitiesTableComponent,],
      imports: [/*BrowserModule, NoopAnimationsModule, */ AppRoutingModule, TestModule],
      providers: [FormBuilder, /*{provide: Router, useValue: mockRouter},*/  {provide: APP_BASE_HREF, useValue: '/'}],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => {
        dialog = TestBed.get(MdDialog);
        const address = new EntityAddress(1, 1, new AddressType(1, 'Work'), new Address(1, 'street', 'city', 'state', '11111'));

        dialogRef = dialog.open(EntityAddressFormComponent, {
          disableClose: false,
          height: '400px',
          width: '600px',
          data: {action: 'E', entityAddress: address, addressTypes: corporationAddressTypes}
        });

        componentInstance = dialogRef.componentInstance;
        componentInstance.ngOnInit();

      }
    );
  });

  it('true is true', () => expect(true).toBe(true));

  it('form valid when empty and untouched', () => {
    expect(componentInstance.addressForm.valid).toBeTruthy();
  });


  it('addressType field validity', () => {
    expect(componentInstance.addressForm.controls['addressType'].valid).toBeTruthy();
  });

  it('addressType field validity', () => {
   // let errors = {};
    componentInstance.addressForm.markAsTouched();
//    fixture.detectChanges();
    const errors = componentInstance.addressForm.controls['addressType'].errors || {};
    expect(errors['required']).toBeTruthy();
  });

});





