import {NgModule} from '@angular/core';
import {
  MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule,
  MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule, MdFormFieldModule, MdCardModule, MdIconModule
} from '@angular/material';
import {HttpModule} from "@angular/http";



@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, MdCardModule, MdIconModule, HttpModule ],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, MdCardModule, MdIconModule, HttpModule ]
})
export class AppMaterialModule { }
