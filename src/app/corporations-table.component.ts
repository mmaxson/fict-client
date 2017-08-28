import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CorporateEntity } from './model/corporate-entity';
import { Page } from './model/page';
import { LegalEntityViewService } from './service/corporate-entity-service';

@Component({
  selector: 'app-corporations-table',
  providers: [
    LegalEntityViewService
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './corporations-table.component.html',
  styleUrls: ['./corporations-table.component.scss']
})
export class CorporationsTableComponent implements OnInit {

  private page = new Page();
  private rows = new Array<CorporateEntity>();

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
