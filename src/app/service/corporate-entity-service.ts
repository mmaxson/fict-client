
import {Injectable} from '@angular/core';
import {Page} from '../model/page';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {TableColumnToDataColumnMap} from '../model/table-column-to-data-column-map';



@Injectable()
export class CorporateEntityService {

  private baseUrl = '//localhost:8080/murun/fict/entities?';


  constructor(private http: HttpClient) {}


  getData(page: Page, columnMap: Array<TableColumnToDataColumnMap>, entityType: string): Promise<Array<Object>> {
    console.log('getData...........................');


    const promise = new Promise((resolve, reject) => {

      this.http.get<Array<string>>(this.constructUrl(page, entityType)).toPromise().then(
        response => {

          const end = Math.min(page.size, response['numberOfElements']);

          const rows = new Array<Object>();
          for (let i = 0; i < end; i++) {

            const row = new Object();
            if (response['content'][i].entityNames.length > 0) {
              for (let j = 0; j < columnMap.length; j++) {
                for (let k = 0; k < columnMap.length; k++) {
                  if ((response['content'][i].entityNames[k]) && columnMap[j].dataColumn === response['content'][i].entityNames[k].nameType.nameTypeText) {
                    row[columnMap[j].tableColumnTitle] = response['content'][i].entityNames[k].name;
                    break;
                  }
                }
              }
            }
            rows.push(row);
          }
          page.totalElements = response['totalElements'];
          page.totalPages = response['totalPages'];
          //    console.log(' page.totalPages ' +  page.totalPages);
          //    console.log(' page.totalElements ' + page.totalElements);
          //    console.log(' page.pageSize ' + page.size);
          resolve(rows);

        });
    });

    return promise;
  }


  private constructUrl(  page: Page, entityType: string ): string {
    return  this.baseUrl + 'entity_type=' + entityType + '&page=' + page.pageNumber + '&' + 'size=' + page.size ;
  }
}

