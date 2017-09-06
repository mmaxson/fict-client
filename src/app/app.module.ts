
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
import {LegalEntityTypeNameTypeResolver} from './resolver/legal-entity-type-name-type-resolver';
import {TableColumnToDataColumnMap} from './model/table-column-to-data-column-map';


const appRoutes: Routes = [
  { path: 'corporations',
    component: LegalEntitiesTableComponent,
    data: {entityType: 'Corporation',
           columnMap: [new TableColumnToDataColumnMap('organizationName', 'Organization Name')]
          },
    resolve: {
      columnData: LegalEntityTypeNameTypeResolver,

      // corporations: CorporateEntityResolver
      }
    },
  { path: 'individuals',
    component: LegalEntitiesTableComponent,
    data: {entityType: 'Individual',
           columnMap:   [new TableColumnToDataColumnMap('first', 'First'),
                         new TableColumnToDataColumnMap('last', 'Last'),  new TableColumnToDataColumnMap('middle', 'Middle'),
                         new TableColumnToDataColumnMap('title', 'Title')]
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
  providers: [EntityTypeNameTypeService, LegalEntityLoaderService, LegalEntityTypeNameTypeResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
