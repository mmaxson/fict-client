import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CorporateEntity} from './model/corporate-entity';
import {Page } from './model/page';
import {LegalEntityService} from './service/legal-entity-service';

@Component({
  selector: 'app-legal-entities-table',
  providers: [
    LegalEntityService
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legal-entities-table.component.html',
  styleUrls: ['./legal-entities-table.component.scss']
})
export class LegalEntitiesTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<CorporateEntity>();

  constructor(private legalEntityService: LegalEntityService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    // this.legalEntityService.getData( this.page, this.rows );
  }

}
