
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntityAddress} from '../model/entity-address';
import 'rxjs/Rx';

@Injectable()
export class EntityAddressSaverService {

  private baseUrl = '//localhost:8080/murun/fict/addresses/';


  constructor(private http: HttpClient) {}


  putData(entityAddress: EntityAddress ): Promise<string> {
    const promise = new Promise((resolve, reject) => {

      console.log('EntityAddressSaverService:::::::::::' + entityAddress.legalEntityId );
      this.http.put<Array<string>>(this.baseUrl, entityAddress).toPromise().then(
        response => {
          resolve('success');
        });
    });

    return promise;
  }

}

