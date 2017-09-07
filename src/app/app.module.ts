
import {BrowserModule} from '@angular/platform-browser';
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



const appRoutes: Routes = [
  { path: 'corporations',
    component: LegalEntitiesTableComponent,
    data: {entityType: 'Corporation',
          },
    resolve: {
      columnData: LegalEntityTypeNameTypeResolver,
      }
    },
  { path: 'individuals',
    component: LegalEntitiesTableComponent,
    data: {entityType: 'Individual',
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
    LegalEntitiesTableComponent
  ],

  imports: [
    BrowserModule, HttpClientModule, NgxDatatableModule, AppMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
      }
    ),
  ],
  providers: [EntityTypeNameTypeService, LegalEntityLoaderService, EntityAddressLoaderService, LegalEntityTypeNameTypeResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
