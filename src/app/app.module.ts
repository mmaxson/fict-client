
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';

import {ApplicationMainComponent} from './application-main.component';
import {LegalEntitiesTableComponent} from './legal-entities-table.component';

import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {EntityAddressLoaderService} from './service/entity-address-loader';
import {LegalEntityTypeNameTypeResolver} from './resolver/legal-entity-type-name-type-resolver';
import {EntityAddressFormComponent} from './entity-address-form.component';
import {AuthGuardService} from './service/auth-guard.service';
import {AuthenticationService} from './service/authentication-service';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationMainComponent, LegalEntitiesTableComponent, EntityAddressFormComponent
  ],

  imports: [
    BrowserModule, NoopAnimationsModule, ReactiveFormsModule, HttpClientModule, NgxDatatableModule, AppMaterialModule, AppRoutingModule,
  ],
  entryComponents: [
    EntityAddressFormComponent
  ],

  providers: [EntityTypeNameTypeService, LegalEntityLoaderService, EntityAddressLoaderService, LegalEntityTypeNameTypeResolver,
    AuthGuardService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
