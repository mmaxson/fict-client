import {NgModule} from '@angular/core';
import {MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdTableModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

@NgModule({
  imports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdTableModule, CdkTableModule],
  exports: [MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdTableModule, CdkTableModule],
})
export class AppMaterialModule { }
