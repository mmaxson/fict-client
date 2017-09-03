
import {Injectable} from '@angular/core';
import {CorporateEntity} from '../model/corporate-entity';
import {Page} from '../model/page';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';




@Injectable()
export class CorporateEntityService {

  private url = '//localhost:8080/murun/fict/entities?entity_type=Corporation';


  constructor(private http: HttpClient) {}


  getData( page: Page ): Promise<Array<CorporateEntity>> {
    console.log('getData...........................');

    const promise = new Promise((resolve, reject) => {
     this.http.get<Array<string>>(this.url).toPromise().then(
      response => {

        let totalRows = 0;

        const start =  page.pageNumber *  page.size;
        const end = Math.min((start + page.size), response.length);

        const rows = new Array<CorporateEntity>();

        for (let i = start; i < end; i++) {

       let addressExists: Boolean = false;
          for (const j of response[i]['entityAddresses']) {
            totalRows = totalRows + 1;
            const legalEntity = new CorporateEntity(response[i]['entityNames'][0].name,
              j.addressType.addressTypeText, j.address.street, j.address.city, j.address.state, j.address.zipCode);
            rows.push(legalEntity);
            addressExists = true;
          }

          if (!addressExists) {
            totalRows = totalRows + 1;
            const legalEntity = new CorporateEntity(response[i]['entityNames'][0].name, '', '', '', '', '');
            rows.push(legalEntity);
          }
        }
        page.totalElements = totalRows;
        page.totalPages = Math.ceil( page.totalElements / page.size);
    //    console.log(' page.totalPages ' +  page.totalPages);
    //    console.log(' page.totalElements ' + page.totalElements);
    //    console.log(' page.pageSize ' + page.size);
        resolve(rows);
      }

    ) ;
    });

    return promise;
  }
}

