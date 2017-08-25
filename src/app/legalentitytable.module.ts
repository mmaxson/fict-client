import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { LegalEntityTableComponent } from './legalentitytable.component';



@NgModule({
  declarations: [
    LegalEntityTableComponent
  ],
  imports: [
    NgxDatatableModule, BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class LegalEntityTableModule {
}


