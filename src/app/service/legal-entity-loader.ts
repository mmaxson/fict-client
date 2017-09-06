
import {Injectable} from '@angular/core';
import {Page} from '../model/page';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class LegalEntityLoaderService {

  private baseUrl = '//localhost:8080/murun/fict/entities?';


  constructor(private http: HttpClient) {}


  getData(page: Page, columns: Array<Object>, entityType: string): Promise<Array<Object>> {
    const promise = new Promise((resolve, reject) => {

      this.http.get<Array<string>>(this.constructUrl(page, entityType)).toPromise().then(
        response => {

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
            }
            rows.push(row);
          }
          page.totalElements = response['totalElements'];
          page.totalPages = response['totalPages'];
          resolve(rows);
        });
    });

    return promise;
  }

  private constructUrl(  page: Page, entityType: string ): string {
    return  this.baseUrl + 'entity_type=' + entityType + '&page=' + page.pageNumber + '&' + 'size=' + page.size ;
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

