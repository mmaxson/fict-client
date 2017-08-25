
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LegalEntityTableComponent } from './legalentitytable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [

  {path: 'list', component: LegalEntityTableComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    LegalEntityTableComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, NgxDatatableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
