import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { LegalEntityView } from './model/legal-entity-view';
import { Page } from './model/page';

import { LegalEntityViewService } from './service/legal-entity-service';



@Component({
  selector: 'app-entity-table',
  providers: [
    LegalEntityViewService
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './corporations-table.component.html',
  styleUrls: ['./corporations-table.component.scss']

})
export class CorporationsTableComponent implements OnInit {

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
