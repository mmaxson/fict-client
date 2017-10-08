
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {LegalEntityTypeNameType} from '../model/legal-entity-type-name-type';
import {EntityTypeNameTypeService} from '../service/entity-type-name-type-service';

@Injectable()
export class LegalEntityTypeNameTypeResolver implements Resolve<any> {
  constructor(private router: Router, private entityTypeNameTypeService: EntityTypeNameTypeService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<Array<LegalEntityTypeNameType>>  | boolean {

    return this.entityTypeNameTypeService.getEntityTypeNameTypeList(route.parent.data['user']).
      then( data => {
         if (data) {
           return data;
         } else {
           console.log( 'resolver false');  // TODO cancel navigation
           return false;
         }
    });
  }
}
