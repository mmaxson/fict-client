
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';
import {LegalEntitiesTableComponent} from './legal-entities-table.component';

import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {LegalEntityLoaderService} from './service/legal-entity-loader';
import {EntityAddressLoaderService} from './service/entity-address-loader';
import {LegalEntityTypeNameTypeResolver} from './resolver/legal-entity-type-name-type-resolver';
import {EntityAddressFormComponent} from './entity-address-form.component';
import {AddressType} from './model/address-type';

const addressTypes: Array<AddressType> = [new AddressType(1, 'Residence'),
  new AddressType(2, 'Work'), new AddressType(3, 'Mailing'), new AddressType(4, 'Branch'), new AddressType(5, 'Headquarters'),
  new AddressType(6, 'Warehouse'), new AddressType(7, 'Divisional Headquarters')];

const appRoutes: Routes = [
  { path: 'corporations',
    component: LegalEntitiesTableComponent,
    data: {entityType: 'Corporation', addressTypes: addressTypes
          },
    resolve: {
      columnData: LegalEntityTypeNameTypeResolver,
      }
    },
  { path: 'individuals',
    component: LegalEntitiesTableComponent,
    data: {entityType: 'Individual', addressTypes: addressTypes
           },
    resolve: {
      columnData: LegalEntityTypeNameTypeResolver,
      }
    },
  { path: '', redirectTo: '/corporations', pathMatch: 'full'}
];





@NgModule({
  declarations: [
    AppComponent,
    LegalEntitiesTableComponent, EntityAddressFormComponent
  ],

  imports: [
    BrowserModule, NoopAnimationsModule, ReactiveFormsModule, HttpClientModule, NgxDatatableModule, AppMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
      }
    ),
  ],
  entryComponents: [
    EntityAddressFormComponent
  ],

  providers: [EntityTypeNameTypeService, LegalEntityLoaderService, EntityAddressLoaderService, LegalEntityTypeNameTypeResolver,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
