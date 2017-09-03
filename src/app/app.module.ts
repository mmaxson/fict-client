
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';
import {CorporationsTableComponent} from './corporations-table.component';
import {IndividualsTableComponent} from './individuals-table.component';
// import {LegalEntitiesTableComponent} from './legal-entities-table.component.tsxxx';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';
import {CorporateEntityService} from './service/corporate-entity-service';
import {IndividualEntityService} from './service/individual-entity-service';
import {LegalEntityTypeNameTypeResolver} from './resolver/legal-entity-type-name-type-resolver';

const appRoutes: Routes = [
  { path: 'corporations',
    component: CorporationsTableComponent,
    resolve: {
      columnData: LegalEntityTypeNameTypeResolver
      // corporations: CorporateEntityResolver
    }
    },
  { path: 'individuals',
    component: IndividualsTableComponent,
    resolve: { columnData: LegalEntityTypeNameTypeResolver }
    },
  { path: '', redirectTo: '/corporations', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CorporationsTableComponent, IndividualsTableComponent
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
  providers: [EntityTypeNameTypeService, CorporateEntityService, IndividualEntityService, LegalEntityTypeNameTypeResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
