
import {Injectable} from '@angular/core';
import {Page} from '../model/page';
import {AddressType} from '../model/address-type';
import {AddressRow} from '../model/address-row';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class EntityAddressLoaderService {

  private baseUrl = '//localhost:8080/murun/fict/addresses/id/';


  constructor(private http: HttpClient) {}


  getData(page: Page, legalEntityId: number, addressTypes: Array<AddressType>): Promise<Array<AddressRow>> {
    const promise = new Promise((resolve, reject) => {

      console.log('EntityAddressLoaderService:::::::::::' + page.pageNumber );
      this.http.get<Array<string>>(this.constructUrl(page, legalEntityId)).toPromise().then(
        response => {

          const end = Math.min(page.size, response['numberOfElements']);

          const rows = new Array<AddressRow>();
          for (let i = 0; i < end; i++) {

            const row = new AddressRow(
              response['content'][i].entityAddressId,
              response['content'][i].addressType.addressTypeId,
              AddressType.getAddressTypeText(response['content'][i].addressType.addressTypeId, addressTypes),
              response['content'][i].address.addressId,
              response['content'][i].address.street,
              response['content'][i].address.city,
              response['content'][i].address.state,
              response['content'][i].address.zipCode);

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

