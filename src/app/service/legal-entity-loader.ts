
import {Injectable} from '@angular/core';
import {Page} from '../model/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class LegalEntityLoaderService {

  private url = '//localhost:8080/murun/fict/entities';


  constructor(private http: HttpClient) {}


  getData(page: Page, columns: Array<Object>, entityType: string): Promise<Array<Object>> {
    const promise = new Promise((resolve, reject) => {

      this.http.get<Array<string>>(this.url, {
        params: new HttpParams()
          .set('access_token', localStorage.getItem('authToken'))
          .set('entity_type', entityType)
          .set('page', page.pageNumber.toString())
          .set('size', page.size.toString())}).toPromise()
        .then(
          (response) => {
            const end = Math.min(page.size, response['numberOfElements']);

            const rows = new Array<Object>();
            for (let i = 0; i < end; i++) {

              const row = new Object();
              if (response['content'][i].entityNames.length > 0) {
                for (let j = 0; j < columns.length; j++) {
                  for (let k = 0; k < columns.length; k++) {
                    if ((response['content'][i].entityNames[k])
                      && columns[j]['name'] === response['content'][i].entityNames[k].nameType.nameTypeText) {
                      row[this.getTableColumnTitle(columns[j]['name'])] = response['content'][i].entityNames[k].name;
                      break;
                    }
                  }
                }
                row['legalEntityId'] = response['content'][i].legalEntityId;
              }
              rows.push(row);
            }
            page.totalElements = response['totalElements'];
            page.totalPages = response['totalPages'];
            resolve(rows);
          },
          (error) => {
            if (error.error instanceof Error) {
              console.log('An error occurred:', error.error.message);
            } else {
              console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
            }
            reject('error');
          }
        );
    });

    return promise;
  }

  private getTableColumnTitle(dataColumnTitle: string): string {
      let retVal = '';
      for (let i = 0; i < dataColumnTitle.length; i++) {
        if ( dataColumnTitle.charAt(i) !== ' ') {
          retVal = retVal + dataColumnTitle.charAt(i);
        }
      }
    return retVal.charAt(0).toLowerCase() + retVal.substring(1);
  }
}

