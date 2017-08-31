
import {Injectable } from '@angular/core';
import {LegalEntityTypeNameType} from '../model/legal-entity-type-name-type';
import {HttpClient } from '@angular/common/http';

interface ServerResponse {
  results: string[];
}


@Injectable()
export class EntityTypeNameTypeService {

  private testVar = new Array<string>();
  private url = '//localhost:8080/murun/fict/entityTypeNameTypes';
  private entityTypeNameTypeList = new Array<LegalEntityTypeNameType>();



  constructor(private http: HttpClient) {


  }


  public loadTestVar() {

    this.testVar.push('a');
    this.testVar.push('b');
    this.testVar.push('c');
  }

  public loadEntityTypeNameTypeList(entityTypeNameTypeList) {

    this.loadTestVar();

     this.http.get<ServerResponse>(this.url).subscribe(
         function ( data: ServerResponse) {
           this.results = data;

           for (const result of this.results) {
             entityTypeNameTypeList.push(new LegalEntityTypeNameType(result.legalEntityType.legalEntityTypeText,
               result.nameType.nameTypeText));
           }

         },
        function (exception: any) {
          console.log('Exception: ' + exception);
        },
        function () {
          console.log('************** Completed ***********************');
        }
      );
  }



  getEntityTypeNameTypes(entityTypeText: string): Array<string> {
    const retVal = new Array<string>();
    for ( const val of this.entityTypeNameTypeList){
      console.log( val );
      if ( val.entityTypeText === entityTypeText) {
        retVal.push(val.nameTypeText);
      }
    }
    return retVal;
  }

  getTestVar(): Array<string> {
    return this.testVar ;
  }

  getEntityTypeNameTypeList(): Array<LegalEntityTypeNameType>{
    return this.entityTypeNameTypeList;
  }
}

