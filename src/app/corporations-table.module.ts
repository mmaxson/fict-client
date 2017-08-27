import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { CorporationsTableComponent } from './corporations-table.component';



@NgModule({
  declarations: [
    CorporationsTableComponent
  ],
  imports: [
    NgxDatatableModule, BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class CorporationsTableModule {
}


