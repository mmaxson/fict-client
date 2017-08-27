
import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {LegalEntityTableComponent } from './legalentitytable.component';
import {NgxDatatableModule } from '@swimlane/ngx-datatable';
import {HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LegalEntityTableComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes), NgxDatatableModule, AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
