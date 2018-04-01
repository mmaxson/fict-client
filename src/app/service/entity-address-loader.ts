
import {Injectable} from '@angular/core';
import {Page} from '../model/page';
import {AddressType} from '../model/address-type';
import {AddressRow} from '../model/address-row';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/Rx' ;
import {User} from '../model/user';

@Injectable()
export class EntityAddressLoaderService {

  private url = '//localhost:8080/murun/fict/addresses/id/';

  constructor(private http: HttpClient) {}


  getData(user: User, page: Page, legalEntityId: number, addressTypes: Array<AddressType>): Promise<Array<AddressRow>> {
    const promise = new Promise<Array<AddressRow>>((resolve, reject) => {

      console.log('EntityAddressLoaderService:::::::::::' + page.pageNumber );
      this.http.get<Array<string>>(this.url + legalEntityId, {
          params: new HttpParams()
            .set('access_token', user.access_token)
           // .set('id', legalEntityId.toString())
            .set('page', page.pageNumber.toString())
            .set('size', page.size.toString()) }).toPromise()
        .then(
          (response) => {
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
          },
          (error) => {
            if (error.error instanceof Error) {
              console.log('An error occurred:', error.error.message);
            } else {
              console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
            }
            reject('Error loading entity address data.');
          },
        );
    });

    return promise;
  }


}

