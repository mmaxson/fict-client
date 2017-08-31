
import {Injectable} from '@angular/core';
import {CorporateEntity} from '../model/corporate-entity';
import {Page} from '../model/page';
import {HttpClient} from '@angular/common/http';

interface LegalEntityResponse {
  results: string[];
}


@Injectable()
export class CorporateEntityService {

  private url = '//localhost:8080/murun/fict/entities?entity_type=Corporation';


  constructor(private http: HttpClient) {}


  getData( page: Page, rows: Array<CorporateEntity> ) {
    this.http.get<LegalEntityResponse>(this.url).subscribe(
      function (data: LegalEntityResponse) {
        this.results = data;
        let totalRows = 0;

        const start =  page.pageNumber *  page.size;
        const end = Math.min((start + page.size), this.results.length);

        for (let i = start; i < end; i++) {

          let addressExists: Boolean = false;
          for (let j of this.results[i].entityAddresses) {
            totalRows = totalRows + 1;
            const legalEntity = new CorporateEntity(this.results[i].entityNames[0].name,
              j.addressType.addressTypeText, j.address.street, j.address.city, j.address.state, j.address.zipCode);
            rows.push(legalEntity);
            addressExists = true;
          }

          if (!addressExists) {
            totalRows = totalRows + 1;
            const legalEntity = new CorporateEntity(this.results[i].entityNames[0].name, '', '', '', '', '');
            rows.push(legalEntity);
          }

        }
        page.totalElements = totalRows;
        page.totalPages = Math.ceil( page.totalElements / page.size);
        console.log(' page.totalPages ' +  page.totalPages);
        console.log(' page.totalElements ' + page.totalElements);
        console.log(' page.pageSize ' + page.size);

      },
      function (exception: any) {
        console.log('Exception: ' + exception);
      },
      function () {
        console.log('************** Completed ***********************');
      }
    );
  }
}

