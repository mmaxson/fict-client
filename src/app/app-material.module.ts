import {NgModule} from '@angular/core';
import {MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdTableModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule],
})
export class AppMaterialModule { }
