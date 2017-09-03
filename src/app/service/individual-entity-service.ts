
import {Injectable} from '@angular/core';
import {IndividualEntity} from '../model/individual-entity';
import {Page} from '../model/page';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';




@Injectable()
export class IndividualEntityService {

  private url = '//localhost:8080/murun/fict/entities?entity_type=Individual';


  constructor(private http: HttpClient) {}


  public getData( page: Page): Promise<Array<IndividualEntity>> {
    const promise = new Promise((resolve, reject) => {
        this.http.get<Array<string>>(this.url).toPromise().then(
          response => {
            let totalRows = 0;

            const start = page.pageNumber * page.size;
            const end = Math.min((start + page.size), response.length);

            const rows = new Array<IndividualEntity>();
            for (let i = start; i < end; i++) {

              let firstName: string;
              let middleName: string;
              let lastName: string;

              for (const k of response[i]['entityNames']) {

                switch (k.nameType.nameTypeText) {
                  case 'First': {
                    firstName = k.name;
                    break;
                  }
                  case 'Middle': {
                    middleName = k.name;
                    break;
                  }
                  case 'Last': {
                    lastName = k.name;
                    break;
                  }
                  default: {
                    console.log('Invalid choice');
                    break;
                  }
                }
              }

              let addressExists = false;
              for (let j of response[i]['entityAddresses']) {
                totalRows = totalRows + 1;

                const legalEntity: IndividualEntity = new IndividualEntity(firstName, middleName, lastName,
                  j.addressType.addressTypeText, j.address.street, j.address.city, j.address.state, j.address.zipCode);

                rows.push(legalEntity);
                addressExists = true;
              }

              if (!addressExists) {
                totalRows = totalRows + 1;
                const legalEntity: IndividualEntity = new IndividualEntity(firstName, middleName, lastName, '', '', '', '', '');
                rows.push(legalEntity);
              }

            }
            page.totalElements = totalRows;
            page.totalPages = Math.ceil(page.totalElements / page.size);
            //   console.log(' page.totalPages ' +  page.totalPages);
            //   console.log(' page.totalElements ' + page.totalElements);
            //  console.log(' page.pageSize ' + page.size);

            resolve(rows);
          });
      });
    return promise;
  }


}

