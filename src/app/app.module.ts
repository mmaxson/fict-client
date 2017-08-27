
import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {NgxDatatableModule } from '@swimlane/ngx-datatable';
import {HttpClientModule } from '@angular/common/http';
import {CorporationsTableComponent } from './corporations-table.component';
import {IndividualsTableComponent } from './individualstable.component';

const routes: Routes = [

  {path: 'corporations', component: CorporationsTableComponent},
  {path: 'individuals', component: IndividualsTableComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    CorporationsTableComponent, IndividualsTableComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes), NgxDatatableModule, AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
