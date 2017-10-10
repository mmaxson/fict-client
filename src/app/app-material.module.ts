import {NgModule} from '@angular/core';
import {
  MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule,
  MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule, MdFormFieldModule, MdCardModule, MdIconModule,
  MdMenuModule
} from '@angular/material';
import {HttpModule} from "@angular/http";



@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, MdCardModule, MdIconModule, HttpModule, MdMenuModule ],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, MdCardModule, MdIconModule, HttpModule, MdMenuModule ]
})
export class AppMaterialModule { }
