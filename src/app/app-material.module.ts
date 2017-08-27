import {NgModule} from '@angular/core';
import {MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule],
})
export class AppMaterialModule { }
