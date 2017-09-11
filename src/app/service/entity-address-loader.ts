
import {Injectable} from '@angular/core';
import {Page} from '../model/page';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class EntityAddressLoaderService {

  private baseUrl = '//localhost:8080/murun/fict/addresses/id/';


  constructor(private http: HttpClient) {}


  getData(page: Page, legalEntityId: number): Promise<Array<Object>> {
    const promise = new Promise((resolve, reject) => {

      console.log('EntityAddressLoaderService:::::::::::' + legalEntityId );
      this.http.get<Array<string>>(this.constructUrl(page, legalEntityId)).toPromise().then(
        response => {

          const end = Math.min(page.size, response['numberOfElements']);

          const rows = new Array<Object>();
          for (let i = 0; i < end; i++) {

            const row = new Object();
            row['entityAddressId'] = response['content'][i].entityAddressId;
            row['address'] = response['content'][i].addressType.addressTypeText;
            row['street'] = response['content'][i].address.street;
            row['city'] = response['content'][i].address.city;
            row['state'] = response['content'][i].address.state;
            row['zipCode'] = response['content'][i].address.zipCode;

           // console.log(row);
            rows.push(row);
          }
          page.totalElements = response['totalElements'];
          page.totalPages = response['totalPages'];
          resolve(rows);
        });
    });

    return promise;
  }

  private constructUrl(  page: Page, legalEntityId: number ): string {
    return  this.baseUrl + legalEntityId + '?page=' + page.pageNumber + '&' + 'size=' + page.size;
  }

}

