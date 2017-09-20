import {NgModule} from '@angular/core';
import {
  MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule,
  MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule, MdFormFieldModule, MdCardModule
} from '@angular/material';



@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, MdCardModule ],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule,
    MdFormFieldModule, MdCardModule]
})
export class AppMaterialModule { }
