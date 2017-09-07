
import {Injectable} from '@angular/core';
import {LegalEntityTypeNameType} from '../model/legal-entity-type-name-type';
import {HttpClient } from '@angular/common/http';
import 'rxjs/Rx';


@Injectable()
export class EntityTypeNameTypeService  {

  private url = '//localhost:8080/murun/fict/entityTypeNameTypes';


  constructor(private http: HttpClient) {
  }

  public getEntityTypeNameTypeList(): Promise<Array<LegalEntityTypeNameType>> {

    console.log('loadEntityTypeNameTypeList::::::::::::::::::::');

    const promise = new Promise((resolve, reject) => {
      this.http.get<Array<string>>(this.url).toPromise().then(
        response => {
         const entityTypeNameTypeList = new Array<LegalEntityTypeNameType>();
         for (const result of response) {
            entityTypeNameTypeList.push(new LegalEntityTypeNameType(result['legalEntityType'].legalEntityTypeText,
             result['nameType'].nameTypeText));
          }
          resolve(entityTypeNameTypeList);
        }
      );
    });

    return promise;
  }



  public getEntityTypeNameTypes(entityTypeNameTypeList: Array<LegalEntityTypeNameType>, entityTypeText: string): Array<string> {
  // console.log( 'getEntityTypeNameTypes param' + entityTypeText);
    const retVal = new Array<string>();
    for ( const val of entityTypeNameTypeList){
   //  console.log( 'getEntityTypeNameTypes ' + val.nameTypeText );
      if ( val.entityTypeText === entityTypeText) {
        retVal.push( val.nameTypeText );
      }
    }
    return retVal;
  }

}

