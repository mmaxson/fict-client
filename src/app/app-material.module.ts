import {NgModule} from '@angular/core';
import {
  MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule,
  MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule, MdFormFieldModule,
} from '@angular/material';



@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, ],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, ]
})
export class AppMaterialModule { }
