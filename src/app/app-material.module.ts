import {NgModule} from '@angular/core';
import {
  MatSidenavModule, MatToolbarModule, MatButtonModule, MatCheckboxModule,
  MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatCardModule, MatIconModule,
  MatMenuModule
} from '@angular/material';

import {HttpClientModule} from "@angular/common/http";



@NgModule({
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule,
    MatFormFieldModule, MatCardModule, MatIconModule, HttpClientModule, MatMenuModule ],
  exports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule,
    MatFormFieldModule, MatCardModule, MatIconModule, HttpClientModule, MatMenuModule ]
})
export class AppMaterialModule { }
