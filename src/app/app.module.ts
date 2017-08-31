
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';
import {CorporationsTableComponent} from './corporations-table.component';
import {IndividualsTableComponent} from './individuals-table.component';
import {LegalEntitiesTableComponent} from './legal-entities-table.component';
import {EntityTypeNameTypeService} from './service/entity-type-name-type-service';

const routes: Routes = [
  {path: 'corporations', component: CorporationsTableComponent},
  {path: 'individuals', component: IndividualsTableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LegalEntitiesTableComponent, CorporationsTableComponent, IndividualsTableComponent
  ],

  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes), NgxDatatableModule, AppMaterialModule,
  ],
  providers: [EntityTypeNameTypeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
