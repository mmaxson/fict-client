import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { LegalEntityView } from './model/legal-entity-view';
import { Page } from './model/page';

import { LegalEntityViewService } from './service/mock-server-results-service';

interface LegalEntityResponse {
  results: string[];
}

@Component({
  selector: 'app-entity-table',
  providers: [
    LegalEntityViewService
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './legalentitytable.component.html',
  styleUrls: ['./legalentitytable.component.scss']

})
export class LegalEntityTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<LegalEntityView>();

  constructor(private legalEntityViewService: LegalEntityViewService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.legalEntityViewService.getData( this.page, this.rows );
  }

}
