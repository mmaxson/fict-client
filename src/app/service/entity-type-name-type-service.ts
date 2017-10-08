
import {Injectable} from '@angular/core';
import {LegalEntityTypeNameType} from '../model/legal-entity-type-name-type';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';
import {User} from '../model/user';

@Injectable()
export class EntityTypeNameTypeService  {

  private url = '//localhost:8080/murun/fict/entityTypeNameTypes';


  constructor(private http: HttpClient) {
  }

  public getEntityTypeNameTypeList(user: User): Promise<Array<LegalEntityTypeNameType>> {

    console.log('loadEntityTypeNameTypeList::::::::::::::::::::');

    const promise = new Promise((resolve, reject) => {
      this.http.get<Array<string>>(this.url,{
        params: new HttpParams()
          .set('access_token', user.access_token )
      }).toPromise()
        .then(
          (response) => {
            const entityTypeNameTypeList = new Array<LegalEntityTypeNameType>();
            for (const result of response) {
              entityTypeNameTypeList.push(new LegalEntityTypeNameType(result['legalEntityType'].legalEntityTypeText,
                result['nameType'].nameTypeText));
            }
            resolve(entityTypeNameTypeList);
          },
          (error) => {
            if (error.error instanceof Error) {
              console.log('An error occurred:', error.error.message);
            } else {
              console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
            }
            reject('error');
          },
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

