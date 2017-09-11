import {NgModule} from '@angular/core';
import {
  MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule,
  MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule
} from '@angular/material';



@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdDialogModule, MdSelectModule, MdOptionModule]
})
export class AppMaterialModule { }
