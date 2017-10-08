import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {AuthGuardService} from './service/auth-guard.service';
import {ApplicationMainComponent} from './application-main.component';
import {LegalEntityTypeNameTypeResolver} from './resolver/legal-entity-type-name-type-resolver';

import {LegalEntitiesTableComponent} from './legal-entities-table.component';
import {AddressType} from './model/address-type';
import {User} from './model/user';
import {UserResolver} from './resolver/user-resolver';

const user: User = new User();

export const corporationAddressTypes: Array<AddressType> = [
  new AddressType(3, 'Mailing'), new AddressType(4, 'Branch'), new AddressType(5, 'Headquarters'),
  new AddressType(6, 'Warehouse'), new AddressType(7, 'Divisional Headquarters')];

export const individualAddressTypes: Array<AddressType> = [new AddressType(1, 'Residence'),
  new AddressType(2, 'Work'), new AddressType(3, 'Mailing')];

export const appRoutes: Routes = [
  {
    path: 'main', canActivate: [AuthGuardService],
    component: ApplicationMainComponent,
    resolve: {
      user: UserResolver,
    },
    children: [
      {
        path: 'corporations', canActivate: [AuthGuardService],
        component: LegalEntitiesTableComponent,
        data: {
          entityType: 'Corporation', addressTypes: corporationAddressTypes
        },
        resolve: {
          columnData: LegalEntityTypeNameTypeResolver,
        }
      },
      {
        path: 'individuals', canActivate: [AuthGuardService],
        component: LegalEntitiesTableComponent,
        data: {
          entityType: 'Individual', addressTypes: individualAddressTypes
        },
        resolve: {
          columnData: LegalEntityTypeNameTypeResolver,
        }
      }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);





@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
